from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.database_models import GeneModel, DiseaseModel, ProteinModel, DrugModel, RelationshipModel, PaperModel
from backend.schemas.api_schemas import GeneResponse, DiseaseResponse, ProteinResponse, DrugResponse, RelationshipResponse

router = APIRouter(tags=["Biological Entities"])

@router.get("/genes", response_model=List[GeneResponse])
def get_genes(q: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(GeneModel)
    if q:
        query = query.filter(GeneModel.symbol.ilike(f"%{q}%") | GeneModel.name.ilike(f"%{q}%"))
    genes = query.all()
    
    # Calculate paper counts dynamically based on symbol occurrences
    results = []
    for g in genes:
        cnt = db.query(PaperModel).filter(
            (PaperModel.abstract.ilike(f"%{g.symbol}%")) | (PaperModel.title.ilike(f"%{g.symbol}%"))
        ).count()
        results.append(GeneResponse(
            id=g.id,
            symbol=g.symbol,
            name=g.name,
            chromosome=g.chromosome,
            type=g.type,
            description=g.description,
            functions=g.functions,
            associated_diseases=g.associated_diseases,
            paper_count=cnt
        ))
    return results

@router.get("/genes/{gene_id}", response_model=GeneResponse)
def get_gene_by_id(gene_id: int, db: Session = Depends(get_db)):
    gene = db.query(GeneModel).filter(GeneModel.id == gene_id).first()
    if not gene:
        raise HTTPException(status_code=404, detail="Gene not found")
    cnt = db.query(PaperModel).filter(
        (PaperModel.abstract.ilike(f"%{gene.symbol}%")) | (PaperModel.title.ilike(f"%{gene.symbol}%"))
    ).count()
    return GeneResponse(
        id=gene.id,
        symbol=gene.symbol,
        name=gene.name,
        chromosome=gene.chromosome,
        type=gene.type,
        description=gene.description,
        functions=gene.functions,
        associated_diseases=gene.associated_diseases,
        paper_count=cnt
    )

@router.get("/diseases", response_model=List[DiseaseResponse])
def get_diseases(q: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(DiseaseModel)
    if q:
        query = query.filter(DiseaseModel.name.ilike(f"%{q}%"))
    diseases = query.all()
    results = []
    for d in diseases:
        cnt = db.query(PaperModel).filter(
            (PaperModel.abstract.ilike(f"%{d.name}%")) | (PaperModel.title.ilike(f"%{d.name}%"))
        ).count()
        results.append(DiseaseResponse(
            id=d.id,
            name=d.name,
            category=d.category,
            mesh_id=d.mesh_id,
            description=d.description,
            associated_genes=d.associated_genes,
            primary_manifestations=d.primary_manifestations,
            paper_count=cnt
        ))
    return results

@router.get("/diseases/{disease_id}", response_model=DiseaseResponse)
def get_disease_by_id(disease_id: int, db: Session = Depends(get_db)):
    d = db.query(DiseaseModel).filter(DiseaseModel.id == disease_id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Disease not found")
    cnt = db.query(PaperModel).filter(
        (PaperModel.abstract.ilike(f"%{d.name}%")) | (PaperModel.title.ilike(f"%{d.name}%"))
    ).count()
    return DiseaseResponse(
        id=d.id,
        name=d.name,
        category=d.category,
        mesh_id=d.mesh_id,
        description=d.description,
        associated_genes=d.associated_genes,
        primary_manifestations=d.primary_manifestations,
        paper_count=cnt
    )

@router.get("/proteins", response_model=List[ProteinResponse])
def get_proteins(q: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(ProteinModel)
    if q:
        query = query.filter(ProteinModel.name.ilike(f"%{q}%") | ProteinModel.gene_symbol.ilike(f"%{q}%"))
    return query.all()

@router.get("/proteins/{protein_id}", response_model=ProteinResponse)
def get_protein_by_id(protein_id: int, db: Session = Depends(get_db)):
    p = db.query(ProteinModel).filter(ProteinModel.id == protein_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Protein not found")
    return p

@router.get("/drugs", response_model=List[DrugResponse])
def get_drugs(q: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(DrugModel)
    if q:
        query = query.filter(DrugModel.name.ilike(f"%{q}%") | DrugModel.brand_name.ilike(f"%{q}%"))
    return query.all()

@router.get("/relationships", response_model=List[RelationshipResponse])
def get_relationships(
    source_type: Optional[str] = None,
    target_type: Optional[str] = None,
    relationship_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(RelationshipModel)
    if source_type:
        query = query.filter(RelationshipModel.source_type == source_type)
    if target_type:
        query = query.filter(RelationshipModel.target_type == target_type)
    if relationship_type:
        query = query.filter(RelationshipModel.relationship_type == relationship_type)
    return query.all()

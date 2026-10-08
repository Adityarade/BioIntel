import os
import csv
import sys

# Ensure root is in python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database.connection import engine, Base, SessionLocal
from backend.models.database_models import (
    PaperModel, GeneModel, DiseaseModel, ProteinModel, DrugModel, RelationshipModel
)

def seed_database():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    dataset_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "dataset")

    try:
        # 1. Papers
        papers_file = os.path.join(dataset_dir, "papers.csv")
        if os.path.exists(papers_file):
            db.query(PaperModel).delete()
            with open(papers_file, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                count = 0
                for row in reader:
                    paper = PaperModel(
                        id=int(row["id"]),
                        title=row["title"],
                        authors=row["authors"],
                        year=int(row["year"]),
                        journal=row["journal"],
                        abstract=row["abstract"],
                        keywords=row.get("keywords", ""),
                        doi=row.get("doi", "")
                    )
                    db.add(paper)
                    count += 1
                db.commit()
                print(f"Loaded {count} biomedical research papers.")

        # 2. Genes
        genes_file = os.path.join(dataset_dir, "genes.csv")
        if os.path.exists(genes_file):
            db.query(GeneModel).delete()
            with open(genes_file, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                count = 0
                for row in reader:
                    gene = GeneModel(
                        id=int(row["gene_id"]),
                        symbol=row["symbol"],
                        name=row["name"],
                        chromosome=row.get("chromosome"),
                        type=row.get("type"),
                        description=row.get("description"),
                        functions=row.get("functions"),
                        associated_diseases=row.get("associated_diseases")
                    )
                    db.add(gene)
                    count += 1
                db.commit()
                print(f"Loaded {count} genes.")

        # 3. Diseases
        diseases_file = os.path.join(dataset_dir, "diseases.csv")
        if os.path.exists(diseases_file):
            db.query(DiseaseModel).delete()
            with open(diseases_file, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                count = 0
                for row in reader:
                    disease = DiseaseModel(
                        id=int(row["disease_id"]),
                        name=row["name"],
                        category=row.get("category"),
                        mesh_id=row.get("mesh_id"),
                        description=row.get("description"),
                        associated_genes=row.get("associated_genes"),
                        primary_manifestations=row.get("primary_manifestations")
                    )
                    db.add(disease)
                    count += 1
                db.commit()
                print(f"Loaded {count} diseases.")

        # 4. Proteins
        proteins_file = os.path.join(dataset_dir, "proteins.csv")
        if os.path.exists(proteins_file):
            db.query(ProteinModel).delete()
            with open(proteins_file, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                count = 0
                for row in reader:
                    protein = ProteinModel(
                        id=int(row["protein_id"]),
                        name=row["name"],
                        uniprot_id=row.get("uniprot_id"),
                        gene_symbol=row.get("gene_symbol"),
                        molecular_mass_kda=float(row["molecular_mass_kda"]) if row.get("molecular_mass_kda") else None,
                        cellular_localization=row.get("cellular_localization"),
                        function=row.get("function"),
                        associated_diseases=row.get("associated_diseases")
                    )
                    db.add(protein)
                    count += 1
                db.commit()
                print(f"Loaded {count} proteins.")

        # 5. Drugs
        drugs_file = os.path.join(dataset_dir, "drugs.csv")
        if os.path.exists(drugs_file):
            db.query(DrugModel).delete()
            with open(drugs_file, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                count = 0
                for row in reader:
                    drug = DrugModel(
                        id=int(row["drug_id"]),
                        name=row["name"],
                        brand_name=row.get("brand_name"),
                        drug_class=row.get("drug_class"),
                        target_entities=row.get("target_entities"),
                        indication=row.get("indication"),
                        mechanism_of_action=row.get("mechanism_of_action")
                    )
                    db.add(drug)
                    count += 1
                db.commit()
                print(f"Loaded {count} therapeutic drugs.")

        # 6. Relationships
        rel_file = os.path.join(dataset_dir, "relationships.csv")
        if os.path.exists(rel_file):
            db.query(RelationshipModel).delete()
            with open(rel_file, mode="r", encoding="utf-8") as f:
                reader = csv.DictReader(f)
                count = 0
                for row in reader:
                    rel = RelationshipModel(
                        id=int(row["id"]),
                        source_type=row["source_type"],
                        source_name=row["source_name"],
                        relationship_type=row["relationship_type"],
                        target_type=row["target_type"],
                        target_name=row["target_name"],
                        confidence=float(row.get("confidence", 1.0)),
                        evidence=row.get("evidence", "")
                    )
                    db.add(rel)
                    count += 1
                db.commit()
                print(f"Loaded {count} biological relationships.")

        print("Seeding complete! Database ready.")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()

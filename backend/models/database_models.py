from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Float, DateTime
from backend.database.connection import Base

class PaperModel(Base):
    __tablename__ = "papers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False, index=True)
    authors = Column(String(500), nullable=False)
    year = Column(Integer, nullable=False, index=True)
    journal = Column(String(255), nullable=False)
    abstract = Column(Text, nullable=False)
    keywords = Column(String(500), nullable=True)
    doi = Column(String(100), nullable=True)

class GeneModel(Base):
    __tablename__ = "genes"

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String(50), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    chromosome = Column(String(50), nullable=True)
    type = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    functions = Column(Text, nullable=True)
    associated_diseases = Column(Text, nullable=True)

class DiseaseModel(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False, index=True)
    category = Column(String(100), nullable=True)
    mesh_id = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    associated_genes = Column(Text, nullable=True)
    primary_manifestations = Column(Text, nullable=True)

class ProteinModel(Base):
    __tablename__ = "proteins"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False, index=True)
    uniprot_id = Column(String(50), nullable=True)
    gene_symbol = Column(String(50), nullable=True, index=True)
    molecular_mass_kda = Column(Float, nullable=True)
    cellular_localization = Column(String(255), nullable=True)
    function = Column(Text, nullable=True)
    associated_diseases = Column(Text, nullable=True)

class DrugModel(Base):
    __tablename__ = "drugs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False, index=True)
    brand_name = Column(String(255), nullable=True)
    drug_class = Column(String(255), nullable=True)
    target_entities = Column(Text, nullable=True)
    indication = Column(Text, nullable=True)
    mechanism_of_action = Column(Text, nullable=True)

class RelationshipModel(Base):
    __tablename__ = "relationships"

    id = Column(Integer, primary_key=True, index=True)
    source_type = Column(String(50), nullable=False)
    source_name = Column(String(255), nullable=False, index=True)
    relationship_type = Column(String(100), nullable=False)
    target_type = Column(String(50), nullable=False)
    target_name = Column(String(255), nullable=False, index=True)
    confidence = Column(Float, default=1.0)
    evidence = Column(Text, nullable=True)

class SearchHistoryModel(Base):
    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, index=True)
    query = Column(String(500), nullable=False)
    results_count = Column(Integer, default=0)
    ranking_method = Column(String(50), default="Hybrid")
    created_at = Column(DateTime, default=datetime.utcnow)

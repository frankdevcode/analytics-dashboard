from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from app.database.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True)
    is_active = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class SalesData(Base):
    __tablename__ = "sales_data"
    
    id = Column(Integer, primary_key=True, index=True)
    label = Column(String, index=True)  # Mes
    value = Column(Float)  # Valor de ventas
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class UserGrowthData(Base):
    __tablename__ = "user_growth_data"
    
    id = Column(Integer, primary_key=True, index=True)
    label = Column(String, index=True)  # Mes
    value = Column(Integer)  # Número de usuarios
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class CategoryData(Base):
    __tablename__ = "category_data"
    
    id = Column(Integer, primary_key=True, index=True)
    label = Column(String, index=True)  # Nombre de la categoría
    value = Column(Float)  # Valor o porcentaje
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class ReportData(Base):
    __tablename__ = "report_data"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    status = Column(String)
    date = Column(String)
    size = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

# Esquemas de autenticación
class UserLogin(BaseModel):
    username: str
    password: str

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    is_active: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Esquemas de datos
class DataPoint(BaseModel):
    label: str
    value: float
    
    class Config:
        from_attributes = True

class UserGrowthPoint(BaseModel):
    label: str
    value: int
    
    class Config:
        from_attributes = True

class CategoryPoint(BaseModel):
    label: str
    value: float
    
    class Config:
        from_attributes = True

class ReportItem(BaseModel):
    id: int
    name: str
    type: str
    status: str
    date: str
    size: str
    
    class Config:
        from_attributes = True

class DashboardData(BaseModel):
    sales_data: List[DataPoint]
    user_growth: List[UserGrowthPoint]
    categories: List[CategoryPoint]
    reports: List[ReportItem]
    stats: dict

class ReportsData(BaseModel):
    reports: List[ReportItem]
    stats: dict
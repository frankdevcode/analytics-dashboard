from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.schemas.schemas import DashboardData, ReportsData
from app.services.auth_service import get_current_user
from app.services.data_service import (
    get_sales_data,
    get_user_growth_data,
    get_category_data,
    get_report_data,
    get_dashboard_stats,
    get_reports_stats
)

router = APIRouter(prefix="/data", tags=["data"])

@router.get("/dashboard", response_model=DashboardData)
async def get_dashboard_data(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Obtener todos los datos del dashboard"""
    sales_data = get_sales_data(db)
    user_growth = get_user_growth_data(db)
    categories = get_category_data(db)
    reports = get_report_data(db)
    stats = get_dashboard_stats(db)
    
    return {
        "sales_data": sales_data,
        "user_growth": user_growth,
        "categories": categories,
        "reports": reports,
        "stats": stats
    }

@router.get("/reports", response_model=ReportsData)
async def get_reports_data(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Obtener datos de reportes"""
    reports = get_report_data(db)
    stats = get_reports_stats(db)
    
    return {
        "reports": reports,
        "stats": stats
    }

@router.get("/sales")
async def get_sales(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Obtener datos de ventas"""
    return get_sales_data(db)

@router.get("/users")
async def get_users(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Obtener datos de crecimiento de usuarios"""
    return get_user_growth_data(db)

@router.get("/categories")
async def get_categories(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Obtener datos de categorías"""
    return get_category_data(db)
from sqlalchemy.orm import Session
from app.models.models import SalesData, UserGrowthData, CategoryData, ReportData
from typing import List, Dict
import random
from datetime import datetime, timedelta

def get_sales_data(db: Session) -> List[Dict]:
    """Obtener datos de ventas"""
    sales = db.query(SalesData).all()
    return [{"label": sale.label, "value": sale.value} for sale in sales]

def get_user_growth_data(db: Session) -> List[Dict]:
    """Obtener datos de crecimiento de usuarios"""
    users = db.query(UserGrowthData).all()
    return [{"label": user.label, "value": user.value} for user in users]

def get_category_data(db: Session) -> List[Dict]:
    """Obtener datos de categorías"""
    categories = db.query(CategoryData).all()
    return [{"label": cat.label, "value": cat.value} for cat in categories]

def get_report_data(db: Session) -> List[Dict]:
    """Obtener datos de reportes"""
    reports = db.query(ReportData).all()
    return [{
        "id": report.id,
        "name": report.name,
        "type": report.type,
        "status": report.status,
        "date": report.date,
        "size": report.size
    } for report in reports]

def get_dashboard_stats(db: Session) -> Dict:
    """Obtener estadísticas del dashboard"""
    # Calcular estadísticas basadas en los datos
    sales_data = db.query(SalesData).all()
    user_data = db.query(UserGrowthData).all()
    
    total_sales = sum(sale.value for sale in sales_data)
    total_users = sum(user.value for user in user_data)
    
    return {
        "totalSales": total_sales,
        "totalUsers": total_users,
        "totalOrders": random.randint(800, 1200),
        "conversionRate": round(random.uniform(2.5, 4.5), 1)
    }

def get_reports_stats(db: Session) -> Dict:
    """Obtener estadísticas de reportes"""
    reports = db.query(ReportData).all()
    
    total_reports = len(reports)
    completed_reports = len([r for r in reports if r.status == "Completado"])
    pending_reports = len([r for r in reports if r.status == "Pendiente"])
    
    return {
        "totalReports": total_reports,
        "completedReports": completed_reports,
        "pendingReports": pending_reports,
        "successRate": round((completed_reports / total_reports * 100) if total_reports > 0 else 0, 1)
    }

def initialize_sample_data(db: Session):
    """Inicializar datos de ejemplo"""
    # Verificar si ya existen datos
    if db.query(SalesData).first():
        return
    
    # Datos de ventas
    sales_data = [
        SalesData(label="Enero", value=45000),
        SalesData(label="Febrero", value=52000),
        SalesData(label="Marzo", value=48000),
        SalesData(label="Abril", value=61000),
        SalesData(label="Mayo", value=55000),
        SalesData(label="Junio", value=67000),
    ]
    
    # Datos de crecimiento de usuarios
    user_growth_data = [
        UserGrowthData(label="Enero", value=1200),
        UserGrowthData(label="Febrero", value=1350),
        UserGrowthData(label="Marzo", value=1180),
        UserGrowthData(label="Abril", value=1420),
        UserGrowthData(label="Mayo", value=1380),
        UserGrowthData(label="Junio", value=1520),
    ]
    
    # Datos de categorías
    category_data = [
        CategoryData(label="Tecnología", value=35),
        CategoryData(label="Ropa", value=25),
        CategoryData(label="Hogar", value=20),
        CategoryData(label="Deportes", value=15),
        CategoryData(label="Otros", value=5),
    ]
    
    # Datos de reportes
    report_data = [
        ReportData(name="Reporte de Ventas Q1", type="PDF", status="Completado", date="2024-03-15", size="2.3 MB"),
        ReportData(name="Análisis de Usuarios", type="Excel", status="Pendiente", date="2024-03-20", size="1.8 MB"),
        ReportData(name="Métricas de Conversión", type="PDF", status="Completado", date="2024-03-18", size="3.1 MB"),
        ReportData(name="Reporte Financiero", type="PDF", status="En Proceso", date="2024-03-22", size="4.2 MB"),
        ReportData(name="Análisis de Categorías", type="Excel", status="Completado", date="2024-03-16", size="2.7 MB"),
    ]
    
    # Agregar todos los datos
    for data in sales_data + user_growth_data + category_data + report_data:
        db.add(data)
    
    db.commit()
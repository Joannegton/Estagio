from fastapi import APIRouter, Request
from controllers.exportCsvController import export_csv_controller

router = APIRouter()

@router.post('/exportarExcel')
async def export_csv(request: Request):
    return await export_csv_controller.export_csv(request)
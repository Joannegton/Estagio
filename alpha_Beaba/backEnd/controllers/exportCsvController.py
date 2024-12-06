from fastapi import Request, HTTPException
from fastapi.responses import StreamingResponse
from services.exportCsvService import export_csv_service

class ExportCsvController:
    async def export_csv(self, request: Request):
        try:
            body = await request.json()
            dados = body.get('dados')
            nome_arquivo = body.get('nomeArquivo', 'dados')
            file_data = export_csv_service.export_csv(dados)
            return StreamingResponse(file_data, media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', headers={'Content-Disposition': f'attachment; filename={nome_arquivo}.xlsx'})
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail='Erro ao exportar dados')

export_csv_controller = ExportCsvController()
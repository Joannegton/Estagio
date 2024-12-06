import pandas as pd
import io
import logging

class ExportCsvService:
    def export_csv(self, dados):
        if not dados:
            raise ValueError('Nenhum dado para exportar')

        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            for i, data in enumerate(dados):
                df = pd.DataFrame(data)
                sheet_name = f'Sheet{i+1}'
                df.to_excel(writer, index=False, sheet_name=sheet_name)
        output.seek(0)
        logging.info("Dados exportados para Excel com sucesso")
        return output

export_csv_service = ExportCsvService()
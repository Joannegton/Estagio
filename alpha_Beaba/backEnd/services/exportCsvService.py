import pandas as pd
import io

class ExportCsvService:
    def export_csv(self, dados):
        if not dados:
            raise ValueError('Nenhum dado para exportar')

        df = pd.DataFrame(dados)
        output = io.BytesIO()
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='Sheet1')
        output.seek(0)
        return output

export_csv_service = ExportCsvService()
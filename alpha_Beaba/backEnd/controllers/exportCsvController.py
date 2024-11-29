from flask import request, send_file, jsonify
from services.exportCsvService import export_csv_service

class ExportCsvController:
    def export_csv(self):
        try:
            dados = request.json.get('dados')
            nome_arquivo = request.json.get('nomeArquivo', 'dados')
            file_data = export_csv_service.export_csv(dados)
            return send_file(file_data, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', as_attachment=True, download_name=f'{nome_arquivo}.xlsx')
        except ValueError as e:
            return jsonify({'erro': str(e)}), 400
        except Exception as e:
            return jsonify({'erro': 'Erro ao exportar dados'}), 500

export_csv_controller = ExportCsvController()
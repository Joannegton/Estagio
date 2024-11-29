from flask import Blueprint
from controllers.exportCsvController import export_csv_controller

export_csv_bp = Blueprint('export_csv_bp', __name__)

@export_csv_bp.route('/exportarExcel', methods=['POST'])
def exportar_excel():
    return export_csv_controller.export_csv()
from flask import Flask
from routes.exportCsvRoutes import export_csv_bp

app = Flask(__name__)
app.register_blueprint(export_csv_bp, url_prefix='/')

if __name__ == '__main__':
    app.run(port=5000)
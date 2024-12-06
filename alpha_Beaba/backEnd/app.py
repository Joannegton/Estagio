from fastapi import FastAPI
from routes.exportCsvRoutes import router as export_csv_router

app = FastAPI()
app.include_router(export_csv_router, prefix='')

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=5000)
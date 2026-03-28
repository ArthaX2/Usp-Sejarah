from ultralytics import YOLO
    
# Muat model YOLOv8n yang sudah terlatih (pretrained)
model = YOLO('yolov8n.pt')

# Latih model dengan dataset Anda
# Pastikan data.yaml berada di direktori yang sama dengan script ini
# atau sesuaikan path-nya jika berbeda.
results = model.train(data='data.yaml', epochs=50, imgsz=640)

print("Pelatihan model selesai! Model terbaik disimpan di 'runs/detect/train/weights/best.pt'")
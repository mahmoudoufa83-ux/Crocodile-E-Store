TypeScript
import { useState } from "react";

interface InkProduct {
  id: number;
  brand: string;
  model: string;
  title: string;
  price: number;
  type: "أصلي" | "متوافق";
  color: string;
  yield: number;
  image: string;
  inStock: boolean;
}

function Admin() {
  // منتجات وهمية في البداية لتجربة الشكل والتحكم
  const [products, setProducts] = useState<InkProduct[]>([
    {
      id: 1,
      brand: "HP",
      model: "106A",
      title: "حبر ليزر HP 106A الأسود - متوافق عالي الجودة",
      price: 899,
      type: "متوافق",
      color: "أسود",
      yield: 1000,
      image: "https://p-eg.shptron.com/p/hp-w1106a_01.jpg",
      inStock: true
    },
    {
      id: 2,
      brand: "HP",
      model: "GT53XL",
      title: "زجاجة حبر سائل HP GT53XL أسود - أصلي لطابعات التانك",
      price: 495,
      type: "أصلي",
      color: "أسود",
      yield: 6000,
      image: "https://p-eg.shptron.com/p/hp-1vv22ae_01.jpg",
      inStock: true
    }
  ]);

  // متغيرات الفورم لإضافة حبر جديد
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("HP");
  const [type, setType] = useState<"أصلي" | "متوافق">("متوافق");
  const [color, setColor] = useState("أسود");
  const [image, setImage] = useState("");

  // دالة إضافة المنتج الجديد للجدول فوراً
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) return alert("من فضلك اكتب اسم الحبر وسعره!");

    const newProduct: InkProduct = {
      id: Date.now(),
      brand,
      model: "Custom",
      title,
      price: Number(price),
      type,
      color,
      yield: 2000,
      image: image || "https://via.placeholder.com/150", // صورة مؤقتة لو محطش لينّك
      inStock: true
    };

    setProducts([newProduct, ...products]);
    // تصفية الحقول بعد الإضافة
    setTitle("");
    setPrice("");
    setImage("");
    alert("تم إضافة الحبر بنجاح للوحة التحكم! 🎉");
  };

  // دالة مسح منتج
  const handleDelete = (id: number) => {
    if(confirm("هل أنت متأكد من مسح هذا الحبر من المتجر؟")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // دالة تعديل السعر السريع جوه الجدول
  const handleUpdatePrice = (id: number, newPrice: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, price: Number(newPrice) } : p));
  };

  return (
    <div className="admin-container" style={{ direction: "rtl", padding: "40px 5%", background: "#faf8f5" }}>
      <h1 style={{ color: "#23211d", marginBottom: "30px", fontWeight: "800" }}>🐊 لوحة تحكم كروكودايل للأحبار</h1>
      
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        
        {/* 1. فورمة إضافة حبر جديد */}
        <form onSubmit={handleAddProduct} style={{ background: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #ebdcd0", flex: "1", minWidth: "320px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#8d7b68" }}>إضافة منتج حبر جديد</h2>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>اسم وخرطوشة الحبر كاملاً:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثال: حبر ليزر HP 85A أسود" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
          </div>

          <div style={{ marginBottom: "15px", display: "flex", gap: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>السعر (ج.م):</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="850" style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>الماركة:</label>
              <select value={brand} onChange={(e) => setBrand(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
                <option value="HP">HP</option>
                <option value="Canon">Canon</option>
                <option value="Epson">Epson</option>
                <option value="Brother">Brother</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "15px", display: "flex", gap: "15px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>حالة الحبر:</label>
              <select value={type} onChange={(e) => setType(e.target.value as "أصلي" | "متوافق")} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
                <option value="متوافق">متوافق (Compatible)</option>
                <option value="أصلي">أصلي (Original)</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>اللون:</label>
              <select value={color} onChange={(e) => setColor(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}>
                <option value="أسود">أسود</option>
                <option value="أزرق">أزرق</option>
                <option value="أحمر">أحمر</option>
                <option value="أصفر">أصفر</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "14px" }}>رابط صورة الحبر (URL):</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", direction: "ltr" }} />
          </div>

          <button type="submit" style={{ width: "100%", background: "#8d7b68", color: "white", padding: "12px", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}>نشر الحبر في المتجر فوراً</button>
        </form>

        {/* 2. جدول التحكم في الأسعار والمنتجات الحالية */}
        <div style={{ background: "#fff", padding: "30px", borderRadius: "12px", border: "1px solid #ebdcd0", flex: "2", minWidth: "450px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#23211d" }}>إدارة المخزون والأسعار الحالية</h2>
          
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "right" }}>
            <thead>
              <tr style={{ background: "#f5f2ee", borderBottom: "2px solid #ebdcd0" }}>
                <th style={{ padding: "12px" }}>الصورة</th>
                <th style={{ padding: "12px" }}>المنتج</th>
                <th style={{ padding: "12px" }}>النوع</th>
                <th style={{ padding: "12px" }}>السعر الحالي</th>
                <th style={{ padding: "12px" }}>تحكم</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}><img src={product.image} alt="" style={{ width: "40px", height: "40px", objectFit: "contain" }} /></td>
                  <td style={{ padding: "10px", fontWeight: "600" }}>{product.title}</td>
                  <td style={{ padding: "10px" }}><span style={{ padding: "2px 8px", borderRadius: "4px", fontSize: "12px", background: product.type === "أصلي" ? "#e3f9e5" : "#eaf2ff", color: product.type === "أصلي" ? "#1f7a26" : "#1a56db" }}>{product.type}</span></td>
                  <td style={{ padding: "10px" }}>
                    <input type="number" value={product.price} onChange={(e) => handleUpdatePrice(product.id, e.target.value)} style={{ width: "80px", padding: "5px", borderRadius: "4px", border: "1px solid #ccc", fontWeight: "bold" }} /> ج.م
                  </td>
                  <td style={{ padding: "10px" }}>
                    <button onClick={() => handleDelete(product.id)} style={{ background: "#ff4d4d", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Admin;
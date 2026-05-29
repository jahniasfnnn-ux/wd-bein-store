// هذا الكود يوضع في صفحة الـ HTML
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// استبدل 'USER_ID_HERE' برقم معرف المستخدم الذي ستضعه في Firebase
const unsub = onSnapshot(doc(db, "users", "USER_ID_HERE"), (doc) => {
    const data = doc.data();
    document.getElementById("balance-display").innerText = data.points; // تحديث الرصيد لحظياً
});

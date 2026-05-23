// إنشاء زر الـ AI العائم وإضافته للصفحة تلقائياً
const aiBtn = document.createElement('button');
aiBtn.className = 'ai-btn';
aiBtn.innerHTML = '<i class="fa-solid fa-robot"></i>';
aiBtn.setAttribute('onclick', 'toggleAI()');
document.body.appendChild(aiBtn);

// إنشاء نافذة المحادثة وإضافتها للصفحة تلقائياً
const aiBox = document.createElement('div');
aiBox.className = 'ai-box';
aiBox.id = 'aiBox';
aiBox.innerHTML = `
    <div class="ai-header"><i class="fa-solid fa-brain" style="color:#06b6d4;"></i> مساعد WD BEIN الذكي</div>
    <div class="ai-chat" id="aiChat">
        <div class="msg bot">مرحباً بك يا غالي! 🔥 أنا مساعدك الذكي، اسألني عن الألعاب، الأسعار، أو طريقة الضمان!</div>
    </div>
    <div class="ai-input-box">
        <input type="text" class="ai-input" id="aiIn" placeholder="اكتب سؤالك هنا..." onkeypress="handleAiKey(event)">
        <button class="ai-send" onclick="askAI()">إرسال</button>
    </div>
`;
document.body.appendChild(aiBox);

// تنسيقات الـ AI (CSS) سيتم حقنها برمجياً لضمان عدم تأثر الموقع
const aiStyle = document.createElement('style');
aiStyle.innerHTML = `
    .ai-btn { position: fixed; bottom: 85px; left: 20px; width: 55px; height: 55px; background-color: #7c3aed; border-radius: 50%; border: none; color: white; font-size: 24px; cursor: pointer; z-index: 1000; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.4); }
    .ai-box { display: none; position: fixed; bottom: 150px; left: 20px; width: 290px; height: 360px; background-color: #111827; border: 2px solid #7c3aed; border-radius: 14px; z-index: 1000; flex-direction: column; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.5); }
    .ai-header { background-color: #1f2937; padding: 10px; font-size: 14px; font-weight: bold; border-bottom: 1px solid #374151; display: flex; gap: 8px; align-items: center; }
    .ai-chat { flex: 1; padding: 10px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; font-size: 13px; text-align: right; }
    .msg { padding: 8px 12px; border-radius: 10px; max-width: 85%; line-height: 1.4; color: white; }
    .msg.bot { background-color: #1f2937; align-self: flex-start; }
    .msg.user { background-color: #7c3aed; align-self: flex-end; }
    .ai-input-box { padding: 8px; background-color: #1f2937; display: flex; gap: 6px; border-top: 1px solid #374151; }
    .ai-input { flex: 1; background: #111827; border: 1px solid #4b5563; border-radius: 6px; color: white; padding: 6px 10px; font-size: 13px; outline: none; }
    .ai-send { background: #7c3aed; border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; }
`;
document.head.appendChild(aiStyle);

// دالات التحكم بالـ AI
function toggleAI() {
    const box = document.getElementById('aiBox');
    box.style.display = (box.style.display === 'flex') ? 'none' : 'flex';
}

function handleAiKey(e) {
    if (e.key === 'Enter') askAI();
}

function askAI() {
    const inp = document.getElementById('aiIn');
    const txt = inp.value.trim();
    if (!txt) return;
    
    addBubble(txt, 'user');
    inp.value = '';
    
    setTimeout(() => {
        let reply = "المعذرة منك يا غالي، تواصل مباشرة مع المالك عبر التليجرام @A_G_T4 لمساعدتك فوراً! 👑";
        const low = txt.toLowerCase();
        if (low.includes('سلام') || low.includes('مرحبا') || low.includes('هلا') || low.includes('الو')) {
            reply = "أهلاً بك في متجر WD BEIN! كيف أقدر أخدمك اليوم؟ 😊";
        } else if (low.includes('العاب') || low.includes('حسابات') || low.includes('متوفر')) {
            reply = "نوفر حسابات مخصصة لألعاب: فري فاير 🔥، eFootball ⚽، PUBG 🔫، و FC Mobile 🎮.";
        } else if (low.includes('سعر') || low.includes('بكم') || low.includes('الاسعار')) {
            reply = "الأسعار تعتمد على المواصفات وميزانيتك! اكتب طلبك في قسم الطلبات وسيتم تحديد السعر الأنسب لك.";
        } else if (low.includes('ضمان') || low.includes('امان') || low.includes('مضمون')) {
            reply = "متجرنا يضمن لك أمان وموثوقية 100% لجميع الحسابات المفحوصة والمؤمنة. 🛡️";
        }
        addBubble(reply, 'bot');
    }, 500);
}

function addBubble(t, s) {
    const chat = document.getElementById('aiChat');
    const d = document.createElement('div');
    d.className = 'msg ' + s;
    d.innerText = t;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
}

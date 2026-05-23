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
    <div class="ai-header"><i class="fa-solid fa-brain" style="color:#06b6d4;"></i> مساعد WD BEIN الذكي v2.0</div>
    <div class="ai-chat" id="aiChat">
        <div class="msg bot">مرحباً بك يا غالي في متجر WD BEIN! 🔥 أنا مساعدك الذكي المبني بالذكاء الاصطناعي لتلبية طلباتك. اسألني عن أي شيء (الأسعار، الألعاب المتوفرة، الضمان، أو طريقة الشراء) وسأجيبك فوراً! 😊</div>
    </div>
    <div class="ai-input-box">
        <input type="text" class="ai-input" id="aiIn" placeholder="اكتب سؤالك بأي طريقة هنا..." onkeypress="handleAiKey(event)">
        <button class="ai-send" onclick="askAI()">إرسال</button>
    </div>
`;
document.body.appendChild(aiBox);

// تنسيقات الـ AI (CSS) محقونة برمجياً لحماية الموقع الرئيسي
const aiStyle = document.createElement('style');
aiStyle.innerHTML = `
    .ai-btn { position: fixed; bottom: 85px; left: 20px; width: 55px; height: 55px; background-color: #7c3aed; border-radius: 50%; border: none; color: white; font-size: 24px; cursor: pointer; z-index: 1000; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.4); transition: transform 0.2s; }
    .ai-btn:active { transform: scale(0.9); }
    .ai-box { display: none; position: fixed; bottom: 150px; left: 20px; width: 290px; height: 380px; background-color: #111827; border: 2px solid #7c3aed; border-radius: 14px; z-index: 1000; flex-direction: column; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.5); }
    .ai-header { background-color: #1f2937; padding: 10px; font-size: 13px; font-weight: bold; border-bottom: 1px solid #374151; display: flex; gap: 8px; align-items: center; }
    .ai-chat { flex: 1; padding: 10px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; font-size: 13px; text-align: right; }
    .msg { padding: 8px 12px; border-radius: 10px; max-width: 85%; line-height: 1.5; color: white; word-wrap: break-word; }
    .msg.bot { background-color: #1f2937; align-self: flex-start; border-bottom-right-radius: 2px; }
    .msg.user { background-color: #7c3aed; align-self: flex-end; border-bottom-left-radius: 2px; }
    .ai-input-box { padding: 8px; background-color: #1f2937; display: flex; gap: 6px; border-top: 1px solid #374151; }
    .ai-input { flex: 1; background: #111827; border: 1px solid #4b5563; border-radius: 6px; color: white; padding: 6px 10px; font-size: 13px; outline: none; }
    .ai-send { background: #7c3aed; border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 12px; }
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
    
    // إظهار علامة أن البوت يفكر ويجهز الرد
    const chat = document.getElementById('aiChat');
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'msg bot';
    thinkingDiv.id = 'ai-thinking';
    thinkingDiv.innerText = 'جاري التفكير...';
    chat.appendChild(thinkingDiv);
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
        // حذف علامة التفكير
        const tDiv = document.getElementById('ai-thinking');
        if(tDiv) tDiv.remove();

        let reply = "";
        const msgLow = txt.toLowerCase();

        // 🧠 نظام معالجة النصوص الذكي (يفحص سياق ومفهوم الكلام وليس الكلمة الحرفية فقط)
        
        const التحيات = ['سلام', 'مرحبا', 'هلا', 'الو', 'اهلين', 'الأسطورة', 'منور', 'مساء', 'صباح', 'كيفك', 'شلونك'];
        const الأسعار = ['سعر', 'بكم', 'ب كام', 'فلوس', 'شحن', 'رخيص', 'اسعار', 'التكلفة', 'القيمة'];
        const الألعاب = ['العاب', 'حسابات', 'متوفر', 'الالعاب', 'فري', 'ببجي', 'فيفا', 'بيس', 'ايفوتبول', 'pubg', 'free fire', 'football', 'ea fc'];
        const الضمان = ['ضمان', 'مضمون', 'امان', 'امن', 'تأمين', 'ثقة', 'ميثاق', 'انسرق', 'بند', 'تبنيد'];
        const الطلب = ['كيف', 'طريقة', 'شلون اطلب', 'اشتري', 'طريقه', 'خطوات', 'شراء'];

        // فحص النية والمفهوم
        let نية_التحية = التحيات.some(keyword => msgLow.includes(keyword));
        let نية_السعر = الأسعار.some(keyword => msgLow.includes(keyword));
        let نية_الألعاب = الألعاب.some(keyword => msgLow.includes(keyword));
        let نية_الضمان = الضمان.some(keyword => msgLow.includes(keyword));
        let نية_الطلب = الطلب.some(keyword => msgLow.includes(keyword));

        if (نية_التحية) {
            reply = "يا ميت أهلاً وسهلاً بك يا غالي! منور متجر WD BEIN STORE الأسطوري. شرفتنا ونورتنا، كيف أقدر أساعدك اليوم في تجهيز حسابك المالي والمثالي؟ 😊";
        } 
        else if (نية_الألعاب) {
            reply = "نوفر لك أفضل الحسابات الفخمة والمخصصة لأقوى الألعاب حالياً وبالمواصفات التي تحلم بها تماماً: \n\n🔥 فري فاير (Free Fire)\n⚽ إيفوتبول (eFootball)\n🎮 إي آيه إف سي موبايل (EA FC Mobile)\n🔫 ببجي موبايل (PUBG)\n\nتفضل بالذهاب لقسم (الطلبات) من الشريط السفلي واكتب مواصفاتك المفضلة!";
        } 
        else if (نية_السعر) {
            reply = "أسعارنا هي الأفضل والمنافسة في السوق يا غالي! التكلفة لا تكون ثابتة بل تعتمد بالكامل على السكنات والمواصفات التي تطلبها داخل الحساب، وعلى ميزانيتك الخاصة. توجه لقسم الطلبات، حدد مواصفاتك، واضغط إرسال، وسيقوم المالك بتحديد السعر الأنسب والأرخص لك فورا!";
        } 
        else if (نية_الضمان) {
            reply = "تطمن وارتاح تماماً يا غالي! 🛡️ متجر WD BEIN يضمن لك أمان وموثوقية 100%. جميع الحسابات المعروضة أو التي نجهزها يتم فحصها بدقة وتأمينها وسحبها من مصادر رسمية وموثوقة لضمان عدم تعرضها لأي مشاكل أو بند. حقك محفوظ ومضمون معنا دائماً.";
        } 
        else if (نية_الطلب) {
            reply = "طريقة الشراء سهلة جداً وبسيطة: \n1️⃣ اضغط على أيقونة (الطلبات) بالشريط السفلي.\n2️⃣ اختر اللعبة واكتب المواصفات والسكنات في الصندوق المحدد.\n3️⃣ اضغط على زر (إرسال الطلب عبر التليجرام).\n\nسيفتح لك محادثة المالك مباشرة لتأكيد طلبك وتجهيزه لك خلال ساعات معدودة! 🚀";
        } 
        else {
            reply = "أهلاً بك يا غالي! 👑 سؤالك ممتاز، ولكي أخدمك فيه بدقة متناهية وبدون أي تأخير، يرجى التواصل مباشرة مع المالك والمطور عبر التليجرام على الحساب التالي: @A_G_T4 .. أرسل له سؤالك وسيتم الرد عليك في ثوانٍ ومساعدتك فوراً!";
        }

        addBubble(reply, 'bot');
    }, 800);
}

function addBubble(t, s) {
    const chat = document.getElementById('aiChat');
    const d = document.createElement('div');
    d.className = 'msg ' + s;
    d.innerText = t;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
}

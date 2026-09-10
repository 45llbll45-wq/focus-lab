import type { Reflection, ContentFormat, ContentIdea } from '../types';

interface GeneratorInput {
  taskId?: string;
  taskTitle: string;
  reflection: Reflection;
  format?: ContentFormat;
}

export const generateContentFromReflection = (input: GeneratorInput): Omit<ContentIdea, 'id' | 'createdAt' | 'updatedAt' | 'status'> => {
  const { taskId, taskTitle, reflection, format = 'reel' } = input;
  const learned = reflection.learned || reflection.rawNotes || taskTitle;
  const challenge = reflection.challenge;
  const experiment = reflection.experiment;
  const result = reflection.result;

  switch (format) {
    case 'reel':
      return {
        taskId,
        taskTitle,
        format: 'reel',
        title: `كيف طبقت ${taskTitle.slice(0, 30)} في دقائق؟`,
        hook: `لو كنت تحسب إن ${taskTitle.slice(0, 25)} معقد، شوف كيف سويتها في جلسة واحدة 🚀`,
        body: `🎥 **سيناريو Reel (30-45 ثانية):**\n\n` +
          `[00-05 ث]: إظهار المشكلة أو الهدف: "${challenge || `كنت محتاج أسهّل ${taskTitle}`}"\n` +
          `[05-15 ث]: الفكرة أو الأداة المستخدمة: "${learned}"\n` +
          `[15-30 ث]: طريقة التطبيق: "${experiment || 'بنيت سيناريو بسيط يربط كل الخطوات تلقائياً'}"\n` +
          `[30-45 ث]: النتيجة والـ CTA: "${result || 'النتيجة وفّرت وقت وجهد كبير!'} اكتب لي في التعليقات إذا ودك بالشرح كامل 👇"`
      };

    case 'carousel':
      return {
        taskId,
        taskTitle,
        format: 'carousel',
        title: `دليلك العملي لتطبيق: ${taskTitle.slice(0, 30)}`,
        hook: `خطوة بخطوة: كيف تحترف ${taskTitle.slice(0, 25)} وتتجنب الخطأ اللي طحت فيه 📑`,
        body: `📑 **محتوى السلايدات (Carousel):**\n\n` +
          `• **شريحة 1 (الغلاف):** ${taskTitle} - تجربة عملية ودروس مستفادة\n` +
          `• **شريحة 2 (المفهوم):** وش الفكرة الأساسية؟ (${learned})\n` +
          `• **شريحة 3 (التحدي):** المشكلة اللي واجهتني (${challenge || 'صعوبة الربط في البداية'})\n` +
          `• **شريحة 4 (الحل والتطبيق):** كيف بنيتها؟ (${experiment || 'استخدام أدوات الأتمتة المباشرة'})\n` +
          `• **شريحة 5 (النتيجة):** الأثر الفعلي (${result || 'سرعة ودقة أعلى'})\n` +
          `• **شريحة 6 (CTA):** احفظ المنشور وشاركه مع المهتمين بالأتمتة 📌`
      };

    case 'post':
      return {
        taskId,
        taskTitle,
        format: 'post',
        title: `درس اليوم في رحلة الـ AI Automation: ${taskTitle.slice(0, 30)}`,
        hook: `أكبر درس تعلمته اليوم أثناء بناء ${taskTitle.slice(0, 25)}:`,
        body: `اليوم أثناء تطبيقي العملي، ركزت على:\n` +
          `"${taskTitle}"\n\n` +
          `💡 **وش الشيء الجديد؟**\n` +
          `${learned}\n\n` +
          (challenge ? `⚠️ **التحدي والحل:**\n${challenge}\n\n` : '') +
          (experiment ? `🛠️ **التجربة:**\n${experiment}\n\n` : '') +
          `🎯 **النتيجة والخلاصة:**\n` +
          `${result || 'الاستمرارية في التجربة العملية هي أسرع طريق لفهم الذكاء الاصطناعي والأتمتة.'}\n\n` +
          `💬 ما هي أكثر أداة تستخدمونها حالياً؟`
      };

    case 'tutorial':
      return {
        taskId,
        taskTitle,
        format: 'tutorial',
        title: `Tutorial: بناء ${taskTitle.slice(0, 30)} عملياً`,
        hook: `دليل تقني سريع لتطبيق ${taskTitle.slice(0, 25)} 🛠️`,
        body: `🛠️ **خطوات الشرح العملي:**\n\n` +
          `1. **الهدف:** ${taskTitle}\n` +
          `2. **المتطلبات والمفاهيم:** ${learned}\n` +
          `3. **خطوات الإعداد:**\n` +
          `   - تجهيز الـ Triggers و APIs\n` +
          `   - ${experiment || 'بناء التدفق المنطقي للعمليات'}\n` +
          `4. **حل المشكلات الشائعة:** ${challenge || 'التأكد من مطابقة الـ Payload والـ Headers'}\n` +
          `5. **التشغيل والتحقق:** ${result || 'اختبار السيناريو وتوثيق المخرجات'}`
      };

    default:
      return {
        taskId,
        taskTitle,
        format: 'post',
        title: taskTitle,
        hook: `تجربتي اليوم مع ${taskTitle}`,
        body: `${learned}\n\n${result || ''}`
      };
  }
};
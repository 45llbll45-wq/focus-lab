import type { Step, EnergyLevel, TaskCategory } from '../types';

interface PlanGeneratorInput {
  title: string;
  category: TaskCategory;
  timeMinutes: number;
  energy: EnergyLevel;
}

export const generateSmartPlan = (input: PlanGeneratorInput): Step[] => {
  const { title, category, timeMinutes, energy } = input;
  const isLowEnergy = energy === 'low';
  const cleanTitle = title.trim();

  // Rule: Low Energy MUST have an ultra-light first step (< 5 mins) to build momentum
  if (isLowEnergy) {
    const step1Duration = Math.min(3, Math.max(2, Math.floor(timeMinutes * 0.15)));
    const remainingTime = timeMinutes - step1Duration;
    const step2Duration = Math.floor(remainingTime * 0.55);
    const step3Duration = remainingTime - step2Duration;

    return [
      {
        id: 'step-1',
        text: `تجهيز مساحة العمل وتحديد أول سطر/نقطة في: "${cleanTitle.slice(0, 35)}..."`,
        durationMinutes: step1Duration,
        completed: false,
        isMicroStep: true
      },
      {
        id: 'step-2',
        text: `التركيز على جزء واحد فقط ومحدد جداً دون تشتت`,
        durationMinutes: step2Duration,
        completed: false
      },
      {
        id: 'step-3',
        text: `مراجعة ما تم وإيقاف الجلسة بنجاح`,
        durationMinutes: step3Duration,
        completed: false
      }
    ];
  }

  // Domain-aware decomposition for AI Automation and Content
  const lower = cleanTitle.toLowerCase();
  
  if (category === 'learn' || lower.includes('فهم') || lower.includes('تعلم') || lower.includes('شرح')) {
    const s1 = Math.max(5, Math.round(timeMinutes * 0.3));
    const s2 = Math.max(5, Math.round(timeMinutes * 0.45));
    const s3 = Math.max(3, timeMinutes - s1 - s2);

    return [
      {
        id: 'step-1',
        text: `قراءة وفهم المفهوم الأساسي (${cleanTitle.slice(0, 30)}) وتدوين 3 نقاط رئيسية`,
        durationMinutes: s1,
        completed: false
      },
      {
        id: 'step-2',
        text: `تطبيق مثال عملي مباشر واختبار النتيجة`,
        durationMinutes: s2,
        completed: false
      },
      {
        id: 'step-3',
        text: `تدوين الخلاصة والدرس المستفاد تمهيداً لصناعة المحتوى`,
        durationMinutes: s3,
        completed: false
      }
    ];
  }

  if (category === 'build' || lower.includes('أتمتة') || lower.includes('سيناريو') || lower.includes('make') || lower.includes('n8n') || lower.includes('ربط')) {
    const s1 = Math.max(5, Math.round(timeMinutes * 0.25));
    const s2 = Math.max(10, Math.round(timeMinutes * 0.5));
    const s3 = Math.max(5, timeMinutes - s1 - s2);

    return [
      {
        id: 'step-1',
        text: `تحديد الـ Trigger ومصادر البيانات وتجهيز الحسابات`,
        durationMinutes: s1,
        completed: false
      },
      {
        id: 'step-2',
        text: `بناء وتوصيل الـ Modules واختبار الـ Data Flow`,
        durationMinutes: s2,
        completed: false
      },
      {
        id: 'step-3',
        text: `تشغيل تجربة نهائية (End-to-End Test) والتحقق من عدم وجود أخطاء`,
        durationMinutes: s3,
        completed: false
      }
    ];
  }

  if (category === 'content' || lower.includes('محتوى') || lower.includes('بوست') || lower.includes('ثريد') || lower.includes('ريل') || lower.includes('كاروسيل')) {
    const s1 = Math.max(5, Math.round(timeMinutes * 0.3));
    const s2 = Math.max(5, Math.round(timeMinutes * 0.45));
    const s3 = Math.max(3, timeMinutes - s1 - s2);

    return [
      {
        id: 'step-1',
        text: `صياغة الزاوية والـ Hook القوي وتحديد الجمهور المستهدف`,
        durationMinutes: s1,
        completed: false
      },
      {
        id: 'step-2',
        text: `كتابة متن المحتوى والنقاط العملية/الخطوات بالتفصيل`,
        durationMinutes: s2,
        completed: false
      },
      {
        id: 'step-3',
        text: `مراجعة الصياغة والتنسيق وإضافة الـ Call-to-Action (CTA)`,
        durationMinutes: s3,
        completed: false
      }
    ];
  }

  // General 3-step distribution
  const p1 = Math.max(3, Math.round(timeMinutes * 0.25));
  const p2 = Math.max(5, Math.round(timeMinutes * 0.5));
  const p3 = Math.max(2, timeMinutes - p1 - p2);

  return [
    {
      id: 'step-1',
      text: `تحديد النطاق وتجهيز المتطلبات الأولية`,
      durationMinutes: p1,
      completed: false
    },
    {
      id: 'step-2',
      text: `التنفيذ الفعلي للمهمة: ${cleanTitle}`,
      durationMinutes: p2,
      completed: false
    },
    {
      id: 'step-3',
      text: `المراجعة والتحقق وتلخيص النتيجة`,
      durationMinutes: p3,
      completed: false
    }
  ];
};
import './App.css'
import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Smartphone, Trophy, Shuffle, Eye, Plus, Minus, RotateCcw } from 'lucide-react';

// Game data - we'll expand this incrementally
const GAME_CATEGORIES = [
  { id: 'football-players', name: 'لاعبين كرة قدم', icon: '⚽', color: 'bg-green-500' },
  { id: 'football-teams', name: 'فرق كرة القدم', icon: '🏆', color:  'bg-orange-500'  },
  { id: 'movies', name: 'أفلام', icon: '🎬', color: 'bg-purple-500' },
  { id: 'tv-series', name: 'مسلسلات', icon: '📺', color: 'bg-pink-500' },
  { id: 'countries', name: 'بلاد', icon: '🌍', color: 'bg-blue-500' },
  { id: 'capitals', name: 'عواصم حول العالم', icon: '🏛️', color: 'bg-gray-500' },
  { id: 'famous-people', name: 'مشاهير', icon: '⭐', color: 'bg-yellow-500' },
  { id: 'video-games', name: 'ألعاب إلكترونية', icon: '🎮', color: 'bg-indigo-500' },
  { id: 'supermarket', name: 'فى السوبر ماركت', icon: '🛒', color: 'bg-emerald-500'},
  { id: 'fruits-veggies', name: 'خضروات وفواكه', icon: '🍎', color: 'bg-red-500' },
];

// Sample data for each category (10 items each)
const CATEGORY_DATA = {
  'football-players': [
    { id: 1, name: 'ليونيل ميسي', details: 'لاعب أرجنتيني، اشتهر في برشلونة، فاز بالكرة الذهبية 8 مرات.', image: 'https://placehold.co/300x400/0084FF/FFFFFF?text=ميسي' },
    { id: 2, name: 'كريستيانو رونالدو', details: 'لاعب برتغالي، فاز بالكرة الذهبية 5 مرات.', image: 'https://placehold.co/300x400/FF6B6B/FFFFFF?text=رونالدو' },
    { id: 3, name: 'كيليان مبابي', details: 'لاعب فرنسي، نجم باريس سان جيرمان.', image: 'https://placehold.co/300x400/4ECDC4/FFFFFF?text=مبابي' },
    { id: 4, name: 'إيرلينغ هالاند', details: 'مهاجم نرويجي، يلعب في مانشستر سيتي.', image: 'https://placehold.co/300x400/45B7D1/FFFFFF?text=هالاند' },
    { id: 5, name: 'كيفين دي بروين', details: 'لاعب وسط بلجيكي، نجم مانشستر سيتي.', image: 'https://placehold.co/300x400/96CEB4/FFFFFF?text=دي+بروين' },
    { id: 6, name: 'نيمار جونيور', details: 'لاعب برازيلي، يلعب في الهلال السعودي.', image: 'https://placehold.co/300x400/FFEAA7/000000?text=نيمار' },
    { id: 7, name: 'محمد صلاح', details: 'جناح مصري، نجم ليفربول.', image: 'https://placehold.co/300x400/FD79A8/FFFFFF?text=صلاح' },
    { id: 8, name: 'فيرجيل فان دايك', details: 'مدافع هولندي، يلعب في ليفربول.', image: 'https://placehold.co/300x400/6C5CE7/FFFFFF?text=فان+دايك' },
    { id: 9, name: 'لوكا مودريتش', details: 'لاعب وسط كرواتي، نجم ريال مدريد.', image: 'https://placehold.co/300x400/A29BFE/FFFFFF?text=مودريتش' },
    { id: 10, name: 'روبرت ليفاندوفسكي', details: 'مهاجم بولندي، يلعب في برشلونة.', image: 'https://placehold.co/300x400/E17055/FFFFFF?text=ليفاندوفسكي' },
  ],
  'countries': [
    { id: 1, name: 'اليابان', details: 'دولة جزرية في شرق آسيا، معروفة بالتكنولوجيا والثقافة.', image: 'https://placehold.co/300x400/FF6B6B/FFFFFF?text=اليابان' },
    { id: 2, name: 'البرازيل', details: 'أكبر دولة في أمريكا الجنوبية، مشهورة بكرة القدم وغابات الأمازون.', image: 'https://placehold.co/300x400/4ECDC4/FFFFFF?text=البرازيل' },
    { id: 3, name: 'النرويج', details: 'دولة إسكندنافية معروفة بالمضايق البحرية والأضواء الشمالية.', image: 'https://placehold.co/300x400/45B7D1/FFFFFF?text=النرويج' },
    { id: 4, name: 'مصر', details: 'حضارة قديمة، موطن الأهرامات ونهر النيل.', image: 'https://placehold.co/300x400/FFEAA7/000000?text=مصر' },
    { id: 5, name: 'أستراليا', details: 'دولة قارية، معروفة بالحياة البرية الفريدة والبراري.', image: 'https://placehold.co/300x400/96CEB4/FFFFFF?text=أستراليا' },
    { id: 6, name: 'كندا', details: 'ثاني أكبر دولة من حيث المساحة، معروفة بشراب القيقب.', image: 'https://placehold.co/300x400/FD79A8/FFFFFF?text=كندا' },
    { id: 7, name: 'الهند', details: 'أكثر دول العالم سكانًا، مهد اليوغا والكاري.', image: 'https://placehold.co/300x400/6C5CE7/FFFFFF?text=الهند' },
    { id: 8, name: 'آيسلندا', details: 'دولة جزرية نوردية معروفة بالينابيع الحارة والأنهار الجليدية.', image: 'https://placehold.co/300x400/A29BFE/FFFFFF?text=آيسلندا' },
    { id: 9, name: 'المغرب', details: 'دولة شمال إفريقية، بوابة بين إفريقيا وأوروبا.', image: 'https://placehold.co/300x400/E17055/FFFFFF?text=المغرب' },
    { id: 10, name: 'كوريا الجنوبية', details: 'دولة شرق آسيوية، رائدة عالميًا في التكنولوجيا والكي-بوب.', image: 'https://placehold.co/300x400/00B894/FFFFFF?text=كوريا+الجنوبية' },
  ],
  'football-teams': [
    { id: 1, name: 'ريال مدريد', details: 'نادي إسباني، فاز بدوري أبطال أوروبا 15 مرة.', image: 'https://placehold.co/300x400/FF6B6B/FFFFFF?text=ريال+مدريد' },
    { id: 2, name: 'برشلونة', details: 'نادي إسباني، معروف بالتيكي تاكا وتاريخه العريق.', image: 'https://placehold.co/300x400/4ECDC4/FFFFFF?text=برشلونة' },
    { id: 3, name: 'مانشستر يونايتد', details: 'نادي إنجليزي، فاز بالدوري الإنجليزي 20 مرة.', image: 'https://placehold.co/300x400/45B7D1/FFFFFF?text=مانشستر+يونايتد' },
    { id: 4, name: 'ليفربول', details: 'نادي إنجليزي، معروف بجماهيره المتحمسة وتاريخه الأوروبي.', image: 'https://placehold.co/300x400/FFEAA7/000000?text=ليفربول' },
    { id: 5, name: 'بايرن ميونخ', details: 'نادي ألماني، يهيمن على الدوري الألماني.', image: 'https://placehold.co/300x400/96CEB4/FFFFFF?text=بايرن+ميونخ' },
    { id: 6, name: 'يوفنتوس', details: 'نادي إيطالي، فاز بالدوري الإيطالي 36 مرة.', image: 'https://placehold.co/300x400/FD79A8/FFFFFF?text=يوفنتوس' },
    { id: 7, name: 'باريس سان جيرمان', details: 'نادي فرنسي، مدعوم باستثمارات قطرية.', image: 'https://placehold.co/300x400/6C5CE7/FFFFFF?text=باريس+سان+جيرمان' },
    { id: 8, name: 'مانشستر سيتي', details: 'نادي إنجليزي، فاز بالدوري الإنجليزي بقيادة بيب غوارديولا.', image: 'https://placehold.co/300x400/A29BFE/FFFFFF?text=مانشستر+سيتي' },
    { id: 9, name: 'تشيلسي', details: 'نادي إنجليزي، معروف بنجاحاته الأوروبية.', image: 'https://placehold.co/300x400/E17055/FFFFFF?text=تشيلسي' },
    { id: 10, name: 'الهلال', details: 'نادي سعودي، أكثر الأندية نجاحًا في آسيا.', image: 'https://placehold.co/300x400/00B894/FFFFFF?text=الهلال' },
  ],
  'capitals': [
    { id: 1, name: 'طوكيو', details: 'عاصمة اليابان، مركز التكنولوجيا والثقافة.', image: 'https://placehold.co/300x400/FF6B6B/FFFFFF?text=طوكيو' },
    { id: 2, name: 'برازيليا', details: 'عاصمة البرازيل، معروفة بهندستها المعمارية الحديثة.', image: 'https://placehold.co/300x400/4ECDC4/FFFFFF?text=برازيليا' },
    { id: 3, name: 'أوسلو', details: 'عاصمة النرويج، تقع بين الغابات والمضايق.', image: 'https://placehold.co/300x400/45B7D1/FFFFFF?text=أوسلو' },
    { id: 4, name: 'القاهرة', details: 'عاصمة مصر، موطن الأهرامات ومتحف الحضارة.', image: 'https://placehold.co/300x400/FFEAA7/000000?text=القاهرة' },
    { id: 5, name: 'كانبيرا', details: 'عاصمة أستراليا، مدينة مخططة بعناية.', image: 'https://placehold.co/300x400/96CEB4/FFFFFF?text=كانبيرا' },
    { id: 6, name: 'أوتاوا', details: 'عاصمة كندا، معروفة بمبانيها التاريخية.', image: 'https://placehold.co/300x400/FD79A8/FFFFFF?text=أوتاوا' },
    { id: 7, name: 'نيودلهي', details: 'عاصمة الهند، مركز سياسي وثقافي.', image: 'https://placehold.co/300x400/6C5CE7/FFFFFF?text=نيودلهي' },
    { id: 8, name: 'رييكيافيك', details: 'عاصمة آيسلندا، أصغر عاصمة نوردية.', image: 'https://placehold.co/300x400/A29BFE/FFFFFF?text=رييكيافيك' },
    { id: 9, name: 'الرباط', details: 'عاصمة المغرب، تقع على المحيط الأطلسي.', image: 'https://placehold.co/300x400/E17055/FFFFFF?text=الرباط' },
    { id: 10, name: 'سيول', details: 'عاصمة كوريا الجنوبية، مركز التكنولوجيا والكي-بوب.', image: 'https://placehold.co/300x400/00B894/FFFFFF?text=سيول' },
  ],
  'video-games': [
    { id: 1, name: 'ذا ليجند أوف زيلدا', details: 'لعبة مغامرات من نينتندو، صدرت عام 1986.', image: 'https://placehold.co/300x400/FF6B6B/FFFFFF?text=زيلدا' },
    { id: 2, name: 'ماينكرافت', details: 'لعبة بناء وعالم مفتوح، الأكثر مبيعًا عالميًا.', image: 'https://placehold.co/300x400/4ECDC4/FFFFFF?text=ماينكرافت' },
    { id: 3, name: 'جراند ثيفت أوتو V', details: 'لعبة أكشن وعالم مفتوح من روكستار.', image: 'https://placehold.co/300x400/45B7D1/FFFFFF?text=GTA+V' },
    { id: 4, name: 'فيفا', details: 'لعبة محاكاة كرة القدم من EA Sports.', image: 'https://placehold.co/300x400/FFEAA7/000000?text=فيفا' },
    { id: 5, name: 'ذي لاست أوف أس', details: 'لعبة أكشن ومغامرات من نوتي دوغ.', image: 'https://placehold.co/300x400/96CEB4/FFFFFF?text=ذي+لاست+أوف+أس' },
    { id: 6, name: 'فورتنايت', details: 'لعبة باتل رويال مجانية من إيبك غيمز.', image: 'https://placehold.co/300x400/FD79A8/FFFFFF?text=فورتنايت' },
    { id: 7, name: 'كول أوف ديوتي', details: 'سلسلة ألعاب إطلاق نار من أكتيفيجن.', image: 'https://placehold.co/300x400/6C5CE7/FFFFFF?text=كول+أوف+ديوتي' },
    { id: 8, name: 'ريد ديد ريدمبشن 2', details: 'لعبة غربية ملحمية من روكستار.', image: 'https://placehold.co/300x400/A29BFE/FFFFFF?text=ريد+ديد+ريدمبشن' },
    { id: 9, name: 'سوبر ماريو', details: 'لعبة كلاسيكية من نينتندو.', image: 'https://placehold.co/300x400/E17055/FFFFFF?text=سوبر+ماريو' },
    { id: 10, name: 'إلدن رينغ', details: 'لعبة تقمص أدوار من فرام سوفتوير.', image: 'https://placehold.co/300x400/00B894/FFFFFF?text=إلدن+رينغ' },
  ],
  'supermarket': [
    { id: 1, name: 'خبز', details: 'منتج مخبوز أساسي، متوفر بعدة أنواع.', image: 'https://placehold.co/300x400/FF6B6B/FFFFFF?text=خبز' },
    { id: 2, name: 'حليب', details: 'مشروب مغذي، متوفر كامل الدسم أو قليل الدسم.', image: 'https://placehold.co/300x400/4ECDC4/FFFFFF?text=حليب' },
    { id: 3, name: 'بيض', details: 'مصدر بروتين أساسي، يُباع بالعشرات.', image: 'https://placehold.co/300x400/45B7D1/FFFFFF?text=بيض' },
    { id: 4, name: 'جبن', details: 'منتج ألبان، متوفر بنكهات مختلفة.', image: 'https://placehold.co/300x400/FFEAA7/000000?text=جبن' },
    { id: 5, name: 'ماء', details: 'مياه معدنية معبأة، ضرورية للترطيب.', image: 'https://placehold.co/300x400/96CEB4/FFFFFF?text=ماء' },
    { id: 6, name: 'أرز', details: 'غذاء أساسي، متوفر بأنواع مثل البسمتي.', image: 'https://placehold.co/300x400/FD79A8/FFFFFF?text=أرز' },
    { id: 7, name: 'معكرونة', details: 'منتج غذائي، يُستخدم في وصفات متنوعة.', image: 'https://placehold.co/300x400/6C5CE7/FFFFFF?text=معكرونة' },
    { id: 8, name: 'زيت زيتون', details: 'زيت صحي، يُستخدم في الطهي والسلطات.', image: 'https://placehold.co/300x400/A29BFE/FFFFFF?text=زيت+زيتون' },
    { id: 9, name: 'سكر', details: 'مُحلي يُستخدم في المشروبات والحلويات.', image: 'https://placehold.co/300x400/E17055/FFFFFF?text=سكر' },
    { id: 10, name: 'قهوة', details: 'مشروب منبه، متوفر مطحون أو فوري.', image: 'https://placehold.co/300x400/00B894/FFFFFF?text=قهوة' },
  ],
  'fruits-veggies': [
    { id: 1, name: 'تفاح', details: 'فاكهة حمراء أو خضراء، غنية بالفيتامينات.', image: 'https://placehold.co/300x400/FF6B6B/FFFFFF?text=تفاح' },
    { id: 2, name: 'موز', details: 'فاكهة استوائية، مصدر للبوتاسيوم.', image: 'https://placehold.co/300x400/4ECDC4/FFFFFF?text=موز' },
    { id: 3, name: 'جزر', details: 'خضروات برتقالية، غنية بفيتامين A.', image: 'https://placehold.co/300x400/45B7D1/FFFFFF?text=جزر' },
    { id: 4, name: 'بروكلي', details: 'خضروات خضراء، مفيدة للجهاز المناعي.', image: 'https://placehold.co/300x400/FFEAA7/000000?text=بروكلي' },
    { id: 5, name: 'فراولة', details: 'فاكهة حمراء، غنية بمضادات الأكسدة.', image: 'https://placehold.co/300x400/96CEB4/FFFFFF?text=فراولة' },
    { id: 6, name: 'طماطم', details: 'فاكهة حمراء تُستخدم كخضروات في الطهي.', image: 'https://placehold.co/300x400/FD79A8/FFFFFF?text=طماطم' },
    { id: 7, name: 'سبانخ', details: 'خضروات ورقية، غنية بالحديد.', image: 'https://placehold.co/300x400/6C5CE7/FFFFFF?text=سبانخ' },
    { id: 8, name: 'مانجو', details: 'فاكهة استوائية، حلوة وعصيرية.', image: 'https://placehold.co/300x400/A29BFE/FFFFFF?text=مانجو' },
    { id: 9, name: 'بطاطس', details: 'خضروات درنية، تُستخدم في وصفات متعددة.', image: 'https://placehold.co/300x400/E17055/FFFFFF?text=بطاطس' },
    { id: 10, name: 'عنب', details: 'فاكهة صغيرة، متوفرة باللون الأحمر أو الأخضر.', image: 'https://placehold.co/300x400/00B894/FFFFFF?text=عنب' },
  ],
  'movies': [
    { id: 1, name: 'البريء', details: 'فيلم درامي مصري عام 1986 بطولة أحمد زكي.', image: 'https://placehold.co/300x400/2D3436/FFFFFF?text=البريء' },
    { id: 2, name: 'الكيت كات', details: 'فيلم درامي كوميدي عام 1991 عن حياة شعبية.', image: 'https://placehold.co/300x400/0984e3/FFFFFF?text=الكيت+كات' },
    { id: 3, name: 'إسماعيلية رايح جاي', details: 'فيلم كوميدي عام 1997 بطولة محمد هنيدي.', image: 'https://placehold.co/300x400/00cec9/FFFFFF?text=إسماعيلية+رايح+جاي' },
    { id: 4, name: 'الزوجة الثانية', details: 'فيلم درامي عام 1967 بطولة سعاد حسني.', image: 'https://placehold.co/300x400/2d3436/FFFFFF?text=الزوجة+الثانية' },
    { id: 5, name: 'الناظر', details: 'فيلم كوميدي عام 2000 بطولة علاء ولي الدين.', image: 'https://placehold.co/300x400/6c5ce7/FFFFFF?text=الناظر' },
    { id: 6, name: 'الأيدي الناعمة', details: 'فيلم درامي عام 1963 عن قصة طيب الحلقاوي.', image: 'https://placehold.co/300x400/a29bfe/FFFFFF?text=الأيدي+الناعمة' },
    { id: 7, name: 'السفارة في العمارة', details: 'فيلم كوميدي عام 2005 بطولة عادل إمام.', image: 'https://placehold.co/300x400/fdcb6e/000000?text=السفارة+في+العمارة' },
    { id: 8, name: 'الحفيد', details: 'فيلم درامي عام 1974 بطولة عبد المنعم مدبولي.', image: 'https://placehold.co/300x400/e17055/FFFFFF?text=الحفيد' },
    { id: 9, name: 'الإرهاب والكباب', details: 'فيلم كوميدي سياسي عام 1992 بطولة عادل إمام.', image: 'https://placehold.co/300x400/00b894/FFFFFF?text=الإرهاب+والكباب' },
    { id: 10, name: 'المومياء', details: 'فيلم درامي عام 1969 عن الحضارة الفرعونية.', image: 'https://placehold.co/300x400/fd79a8/FFFFFF?text=المومياء' },
  ],
  'tv-series': [
    { id: 1, name: 'ليالي الحلمية', details: 'مسلسل درامي عن الحياة المصرية عبر عقود.', image: 'https://placehold.co/300x400/2D3436/FFFFFF?text=ليالي+الحلمية' },
    { id: 2, name: 'رأفت الهجان', details: 'مسلسل تجسس عن قصة حقيقية في مصر.', image: 'https://placehold.co/300x400/0984e3/FFFFFF?text=رأفت+الهجان' },
    { id: 3, name: 'يوميات ونيس', details: 'مسلسل كوميدي عائلي بطولة محمد صبحي.', image: 'https://placehold.co/300x400/00cec9/FFFFFF?text=يوميات+ونيس' },
    { id: 4, name: 'بكيزة وزغلول', details: 'مسلسل كوميدي بطولة إسعاد يونس وسعاد نصر.', image: 'https://placehold.co/300x400/2d3436/FFFFFF?text=بكيزة+وزغلول' },
    { id: 5, name: 'الوسية', details: 'مسلسل درامي عن صراعات عائلية حول الميراث.', image: 'https://placehold.co/300x400/6c5ce7/FFFFFF?text=الوسية' },
    { id: 6, name: 'لن أعيش في جلباب أبي', details: 'مسلسل درامي عن صعود شاب فقير.', image: 'https://placehold.co/300x400/a29bfe/FFFFFF?text=لن+أعيش+في+جلباب+أبي' },
    { id: 7, name: 'المال والبنون', details: 'مسلسل درامي عن صراعات المال والسلطة.', image: 'https://placehold.co/300x400/fdcb6e/000000?text=المال+والبنون' },
    { id: 8, name: 'دموع في عيون وقحة', details: 'مسلسل درامي عن قصة حياة درامية.', image: 'https://placehold.co/300x400/e17055/FFFFFF?text=دموع+في+عيون+وقحة' },
    { id: 9, name: 'زيزينيا', details: 'مسلسل تاريخي عن الحياة في الإسكندرية.', image: 'https://placehold.co/300x400/00b894/FFFFFF?text=زيزينيا' },
    { id: 10, name: 'وجه القمر', details: 'مسلسل درامي بطولة فاتن حمامة.', image: 'https://placehold.co/300x400/fd79a8/FFFFFF?text=وجه+القمر' },
  ],
  'famous-people': [
    { id: 1, name: 'أم كلثوم', details: 'مغنية مصرية، لقبت بكوكب الشرق.', image: 'https://placehold.co/300x400/FF6B6B/FFFFFF?text=أم+كلثوم' },
    { id: 2, name: 'عادل إمام', details: 'ممثل كوميدي ودرامي، زعيم الفن المصري.', image: 'https://placehold.co/300x400/4ECDC4/FFFFFF?text=عادل+إمام' },
    { id: 3, name: 'أحمد زكي', details: 'ممثل مصري، اشتهر بأدوار تاريخية وواقعية.', image: 'https://placehold.co/300x400/45B7D1/FFFFFF?text=أحمد+زكي' },
    { id: 4, name: 'فاتن حمامة', details: 'ممثلة مصرية، سيدة الشاشة العربية.', image: 'https://placehold.co/300x400/FFEAA7/000000?text=فاتن+حمامة' },
    { id: 5, name: 'محمد منير', details: 'مغني مصري، يُلقب بالكينج.', image: 'https://placehold.co/300x400/96CEB4/FFFFFF?text=محمد+منير' },
    { id: 6, name: 'سعاد حسني', details: 'ممثلة مصرية، سندريلا السينما العربية.', image: 'https://placehold.co/300x400/FD79A8/FFFFFF?text=سعاد+حسني' },
    { id: 7, name: 'نجيب محفوظ', details: 'روائي مصري، حائز على جائزة نوبل للأدب.', image: 'https://placehold.co/300x400/6C5CE7/FFFFFF?text=نجيب+محفوظ' },
    { id: 8, name: 'عمر الشريف', details: 'ممثل مصري، اشتهر عالميًا في هوليوود.', image: 'https://placehold.co/300x400/A29BFE/FFFFFF?text=عمر+الشريف' },
    { id: 9, name: 'محمد صلاح', details: 'لاعب كرة قدم مصري، نجم ليفربول.', image: 'https://placehold.co/300x400/E17055/FFFFFF?text=محمد+صلاح' },
    { id: 10, name: 'إسعاد يونس', details: 'ممثلة ومنتجة مصرية، مقدمة برامج.', image: 'https://placehold.co/300x400/00B894/FFFFFF?text=إسعاد+يونس' },
  ],
};

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [gameCode, setGameCode] = useState('PLAY123');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [players, setPlayers] = useState({ player1: 'Player 1', player2: 'Player 2' });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  // Load saved data on mount
  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem('guessing-game-players') || '{}');
    const savedScores = JSON.parse(localStorage.getItem('guessing-game-scores') || '{}');
    
    if (Object.keys(savedPlayers).length > 0) setPlayers(savedPlayers);
    if (Object.keys(savedScores).length > 0) setScores(savedScores);
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('guessing-game-players', JSON.stringify(players));
    localStorage.setItem('guessing-game-scores', JSON.stringify(scores));
  }, [players, scores]);

  const shuffleCard = () => {
    if (!selectedCategory) return;
    const categoryData = CATEGORY_DATA[selectedCategory.id] || [];
    const randomCard = categoryData[Math.floor(Math.random() * categoryData.length)];
    setCurrentCard(randomCard);
    setCardRevealed(false);
  };

  const updateScore = (player, delta) => {
    setScores(prev => ({
      ...prev,
      [player]: Math.max(0, prev[player] + delta)
    }));
  };

  const resetScores = () => {
    setScores({ player1: 0, player2: 0 });
  };

  const updatePlayerName = (player, name) => {
    setPlayers(prev => ({
      ...prev,
      [player]: name || `Player ${player === 'player1' ? '1' : '2'}`
    }));
  };

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col">
        {/* Navbar */}
        <nav className="w-full p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={() => setCurrentPage('landing')}>
              🎯 خمن صح
            </h1>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-2">جاهز للتحدى؟</h2>
            <p className="text-white/80 mb-8">أكبر لعبة تخمين فى مصر</p>
            
            {/* Game Modes */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-white/90">
                <Users className="w-5 h-5" />
                <span className="text-sm">Single device party mode</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm">Dual phone competitive mode</span>
              </div>
            </div>

            {/* Game Code Input */}
            <div className="mb-6">
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                placeholder="أدخل الكود"
                className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Enter Game Button */}
            <button
              onClick={() => setCurrentPage('categories')}
              className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center space-x-2 text-lg"
            >
              <span>ابدأ اللعبة</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 text-center text-white/60 text-sm">
          صنعت فى ريمونتادا © مصر 2025 - جميع الحقوق محفوظة
        </footer>
      </div>
    );
  }

  // Categories Page
  if (currentPage === 'categories') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="w-full p-4 bg-white shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => setCurrentPage('landing')}>
              🎯 خمن صح
            </h1>
          </div>
        </nav>

        {/* Categories Grid */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">إختر النوع</h2>
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {GAME_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage('game');
                  // Set initial card
                  const categoryData = CATEGORY_DATA[category.id] || [];
                  if (categoryData.length > 0) {
                    const randomCard = categoryData[Math.floor(Math.random() * categoryData.length)];
                    setCurrentCard(randomCard);
                    setCardRevealed(false);
                  }
                }}
                className={`${category.color} text-white p-6 rounded-2xl font-semibold text-lg shadow-lg hover:scale-105 transition-transform flex items-center justify-between`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.name}</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Game Page
  if (currentPage === 'game' && selectedCategory && currentCard) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="w-full p-4 bg-white shadow-sm">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800 cursor-pointer" onClick={() => setCurrentPage('landing')}>
              🎯 خمن صح
            </h1>
            <p className="text-sm text-gray-600">{selectedCategory.name}</p>
          </div>
        </nav>

        <div className="p-4 max-w-md mx-auto">
          {/* Scoreboard */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 relative">
            <button
              onClick={resetScores}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Player 1 */}
              <div className="text-center">
                <input
                  type="text"
                  value={players.player1}
                  onChange={(e) => updatePlayerName('player1', e.target.value)}
                  className="w-full text-center font-semibold text-gray-800 bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 mb-2"
                />
                <div className="text-3xl font-bold text-blue-600 mb-2">{scores.player1}</div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => updateScore('player1', 1)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateScore('player1', -1)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Player 2 */}
              <div className="text-center">
                <input
                  type="text"
                  value={players.player2}
                  onChange={(e) => updatePlayerName('player2', e.target.value)}
                  className="w-full text-center font-semibold text-gray-800 bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 mb-2"
                />
                <div className="text-3xl font-bold text-purple-600 mb-2">{scores.player2}</div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => updateScore('player2', 1)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateScore('player2', -1)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Game Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            {/* Image Container */}
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={currentCard.image}
                alt={cardRevealed ? currentCard.name : 'Mystery item'}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Card Info */}
            <div className="p-4">
              {cardRevealed ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentCard.name}</h3>
                  <p className="text-gray-600">{currentCard.details}</p>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">???</h3>
                  <p className="text-gray-400">دلوقتى وقت الأسئلة</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={shuffleCard}
              className="bg-blue-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
            >
              <Shuffle className="w-5 h-5" />
              <span>كارت جديد</span>
            </button>
            
            <button
              onClick={() => setCardRevealed(!cardRevealed)}
              className="bg-purple-500 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-purple-600 transition-colors"
            >
              <Eye className="w-5 h-5" />
              <span>{cardRevealed ? 'إخفاء' : 'عرض'}</span>
            </button>
          </div>

          {/* Back to Categories */}
          <button
            onClick={() => setCurrentPage('categories')}
            className="w-full mt-4 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            ← الرجوع للقائمة السابقة
          </button>
        </div>
      </div>
    );
  }

  return <div>تحميل...</div>;
}

export default App;
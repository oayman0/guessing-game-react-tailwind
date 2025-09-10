import './App.css'
import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Smartphone, Trophy, Shuffle, Eye, Plus, Minus, RotateCcw } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
// Game data - we'll expand this incrementally
const GAME_CATEGORIES = [
  { id: 'football-players', name: 'لاعبون كرة قدم', icon: '⚽', color: 'bg-green-400' },
  { id: 'football-teams', name: 'فرق كرة القدم', icon: '🏆', color:  'bg-blue-400'  },
  { id: 'movies', name: 'أفلام', icon: '🎬', color: 'bg-purple-400' },
  { id: 'tv-series', name: 'مسلسلات', icon: '📺', color: 'bg-yellow-400' },
  { id: 'countries', name: 'بلاد', icon: '🌍', color: 'bg-red-400' },
  { id: 'capitals', name: 'عواصم حول العالم', icon: '🏛️', color: 'bg-indigo-400' },
  { id: 'famous-people', name: 'مشاهير', icon: '⭐', color: 'bg-orange-400' },
  { id: 'video-games', name: 'ألعاب إلكترونية', icon: '🎮', color: 'bg-gray-400' },
  { id: 'supermarket', name: 'فى السوبر ماركت', icon: '🛒', color: 'bg-pink-400'},
  { id: 'fruits-veggies', name: 'خضروات وفواكه', icon: '🍎', color: 'bg-emerald-400' },
];

// Sample data for each category (10 items each)
const CATEGORY_DATA = {
  'football-players': [
        {
      "id": 1,
      "name": "محمد صلاح",
      "details": "لاعب مصري، جناح مهاجم، يُعدّ من أفضل لاعبي العالم في مركزه.",
      "image": "images/football-players/1.jpg"
    },
    {
      "id": 7,
      "name": "سيزار أزبيليكويتا",
      "details": "لاعب إسباني، مدافع، قائد سابق لنادي تشيلسي.",
      "image": "images/football-players/7.jpg"
    },
    {
      "id": 10,
      "name": "ألان شيرار",
      "details": "لاعب إنجليزي، هداف تاريخي للدوري الإنجليزي الممتاز.",
      "image": "images/football-players/10.jpg"
    },
    {
      "id": 2,
      "name": "زلاتان إبراهيموفيتش",
      "details": "لاعب سويدي، مهاجم قوي، اشتهر بمهاراته الفنية.",
      "image": "images/football-players/2.jpg"
    },
    {
      "id": 3,
      "name": "محمد أبو تريكة",
      "details": "لاعب مصري، صانع ألعاب، يُلقب بـ 'أمير القلوب'.",
      "image": "images/football-players/3.jpg"
    },
    {
      "id": 4,
      "name": "سيرخيو أغويرو",
      "details": "لاعب أرجنتيني، مهاجم، هداف مانشستر سيتي التاريخي.",
      "image": "images/football-players/4.jpg"
    },
    {
      "id": 5,
      "name": "مايكل أرتيتا",
      "details": "مدرب إسباني ولاعب سابق، قاد آرسنال كمدرب.",
      "image": "images/football-players/5.jpg"
    },
    {
      "id": 6,
      "name": "كريستيان إريكسن",
      "details": "لاعب دنماركي، خط وسط، معروف بقدرته على التمرير.",
      "image": "images/football-players/6.jpg"
    },
    {
      "id": 8,
      "name": "أشلي كول",
      "details": "لاعب إنجليزي، ظهير أيسر، يُعتبر من أفضل المدافعين في مركزه.",
      "image": "images/football-players/8.jpg"
    },
    {
      "id": 9,
      "name": "باتريس إيفرا",
      "details": "لاعب فرنسي، مدافع، اشتهر في مانشستر يونايتد.",
      "image": "images/football-players/9.jpg"
    },
    {
      "id": 11,
      "name": "جوردي ألبا",
      "details": "لاعب إسباني، ظهير أيسر، معروف بتقدمه الهجومي.",
      "image": "images/football-players/11.jpg"
    },
    {
      "id": 12,
      "name": "جوليان ألفاريز",
      "details": "لاعب أرجنتيني، مهاجم، فاز بكأس العالم مع الأرجنتين.",
      "image": "images/football-players/12.jpg"
    },
    {
      "id": 13,
      "name": "أليكسيس سانشيز",
      "details": "لاعب تشيلي، مهاجم، اشتهر بسرعته ومهاراته.",
      "image": "images/football-players/13.jpg"
    },
    {
      "id": 14,
      "name": "داني إنجز",
      "details": "لاعب إنجليزي، مهاجم، معروف بإنهاء الهجمات.",
      "image": "images/football-players/14.jpg"
    },
    {
      "id": 15,
      "name": "نيكولاس أنيلكا",
      "details": "لاعب فرنسي، مهاجم، لعب في العديد من الأندية الكبيرة.",
      "image": "images/football-players/15.jpg"
    },
    {
      "id": 16,
      "name": "أندريس إنييستا",
      "details": "لاعب إسباني، خط وسط، أسطورة برشلونة، فاز بكأس العالم.",
      "image": "images/football-players/16.jpg"
    },
    {
      "id": 17,
      "name": "بيير إيميريك أوباميانغ",
      "details": "لاعب غابوني، مهاجم، يتمتع بسرعه فائقة.",
      "image": "images/football-players/17.jpg"
    },
    {
      "id": 18,
      "name": "مارتن أوديجارد",
      "details": "لاعب نرويجي، خط وسط، قائد نادي آرسنال.",
      "image": "images/football-players/18.jpg"
    },
    {
      "id": 19,
      "name": "مسعود أوزيل",
      "details": "لاعب ألماني، صانع ألعاب، معروف بتمريراته السحرية.",
      "image": "images/football-players/19.jpg"
    },
    {
      "id": 20,
      "name": "جاي جاي أوكوشا",
      "details": "لاعب نيجيري، خط وسط، معروف بمهاراته الفردية الرائعة.",
      "image": "images/football-players/20.jpg"
    },
   ],
  'football-teams': [
    { id: 1, name: 'ريال مدريد', details: 'نادي إسباني، فاز بدوري أبطال أوروبا 15 مرة.', image: 'https://placehold.co/400x300/FF6B6B/FFFFFF?text=ريال+مدريد' },
    { id: 2, name: 'برشلونة', details: 'نادي إسباني، معروف بالتيكي تاكا وتاريخه العريق.', image: 'https://placehold.co/400x300/4ECDC4/FFFFFF?text=برشلونة' },
    { id: 3, name: 'مانشستر يونايتد', details: 'نادي إنجليزي، فاز بالدوري الإنجليزي 20 مرة.', image: 'https://placehold.co/400x300/45B7D1/FFFFFF?text=مانشستر+يونايتد' },
    { id: 4, name: 'ليفربول', details: 'نادي إنجليزي، معروف بجماهيره المتحمسة وتاريخه الأوروبي.', image: 'https://placehold.co/400x300/FFEAA7/000000?text=ليفربول' },
    { id: 5, name: 'بايرن ميونخ', details: 'نادي ألماني، يهيمن على الدوري الألماني.', image: 'https://placehold.co/400x300/96CEB4/FFFFFF?text=بايرن+ميونخ' },
    { id: 6, name: 'يوفنتوس', details: 'نادي إيطالي، فاز بالدوري الإيطالي 36 مرة.', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=يوفنتوس' },
    { id: 7, name: 'باريس سان جيرمان', details: 'نادي فرنسي، مدعوم باستثمارات قطرية.', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=باريس+سان+جيرمان' },
    { id: 8, name: 'مانشستر سيتي', details: 'نادي إنجليزي، فاز بالدوري الإنجليزي بقيادة بيب غوارديولا.', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=مانشستر+سيتي' },
    { id: 9, name: 'تشيلسي', details: 'نادي إنجليزي، معروف بنجاحاته الأوروبية.', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=تشيلسي' },
    { id: 10, name: 'الهلال', details: 'نادي سعودي، أكثر الأندية نجاحًا في آسيا.', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=الهلال' },
    { id: 11, name: 'الأهلي', details: 'نادي مصري، أكثر الأندية تتويجًا في إفريقيا.', image: 'https://placehold.co/400x300/FF9F43/FFFFFF?text=الأهلي' },
    { id: 12, name: 'إنتر ميلان', details: 'نادي إيطالي، فاز بدوري أبطال أوروبا 3 مرات.', image: 'https://placehold.co/400x300/2D3436/FFFFFF?text=إنتر+ميلان' },
    { id: 13, name: 'آرسنال', details: 'نادي إنجليزي، معروف بأسلوب لعبه الجذاب.', image: 'https://placehold.co/400x300/0984E3/FFFFFF?text=آرسنال' },
    { id: 14, name: 'ميلان', details: 'نادي إيطالي، فاز بدوري الأبطال 7 مرات.', image: 'https://placehold.co/400x300/00CEC9/FFFFFF?text=ميلان' },
    { id: 15, name: 'توتنهام', details: 'نادي إنجليزي، يلعب في ملعب ويمبلي الجديد.', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=توتنهام' },
    { id: 16, name: 'النصر', details: 'نادي سعودي، يضم نجوم عالميين مثل رونالدو.', image: 'https://placehold.co/400x300/FDCB6E/000000?text=النصر' },
    { id: 17, name: 'روما', details: 'نادي إيطالي، معروف بجماهيره الشغوفة.', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=روما' },
    { id: 18, name: 'أتلتيكو مدريد', details: 'نادي إسباني، يشتهر بالدفاع القوي.', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=أتلتيكو+مدريد' },
    { id: 19, name: 'بوروسيا دورتموند', details: 'نادي ألماني، معروف بجدار مشجعيه الصفراء.', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=دورتموند' },
    { id: 20, name: 'الزمالك', details: 'نادي مصري، منافس تاريخي للأهلي.', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=الزمالك' },
  ],
  'movies': [
    { id: 1, name: 'البريء', details: 'فيلم درامي مصري عام 1986 بطولة أحمد زكي.', image: 'https://placehold.co/400x300/2D3436/FFFFFF?text=البريء' },
    { id: 2, name: 'الكيت كات', details: 'فيلم درامي كوميدي عام 1991 عن حياة شعبية.', image: 'https://placehold.co/400x300/0984e3/FFFFFF?text=الكيت+كات' },
    { id: 3, name: 'إسماعيلية رايح جاي', details: 'فيلم كوميدي عام 1997 بطولة محمد هنيدي.', image: 'https://placehold.co/400x300/00cec9/FFFFFF?text=إسماعيلية+رايح+جاي' },
    { id: 4, name: 'الزوجة الثانية', details: 'فيلم درامي عام 1967 بطولة سعاد حسني.', image: 'https://placehold.co/400x300/2d3436/FFFFFF?text=الزوجة+الثانية' },
    { id: 5, name: 'الناظر', details: 'فيلم كوميدي عام 2000 بطولة علاء ولي الدين.', image: 'https://placehold.co/400x300/6c5ce7/FFFFFF?text=الناظر' },
    { id: 6, name: 'الأيدي الناعمة', details: 'فيلم درامي عام 1963 عن قصة طيب الحلقاوي.', image: 'https://placehold.co/400x300/a29bfe/FFFFFF?text=الأيدي+الناعمة' },
    { id: 7, name: 'السفارة في العمارة', details: 'فيلم كوميدي عام 2005 بطولة عادل إمام.', image: 'https://placehold.co/400x300/fdcb6e/000000?text=السفارة+في+العمارة' },
    { id: 8, name: 'الحفيد', details: 'فيلم درامي عام 1974 بطولة عبد المنعم مدبولي.', image: 'https://placehold.co/400x300/e17055/FFFFFF?text=الحفيد' },
    { id: 9, name: 'الإرهاب والكباب', details: 'فيلم كوميدي سياسي عام 1992 بطولة عادل إمام.', image: 'https://placehold.co/400x300/00b894/FFFFFF?text=الإرهاب+والكباب' },
    { id: 10, name: 'المومياء', details: 'فيلم درامي عام 1969 عن الحضارة الفرعونية.', image: 'https://placehold.co/400x300/fd79a8/FFFFFF?text=المومياء' },
    { id: 11, name: 'الرجل الذي فقد ظله', details: 'فيلم درامي عام 1968 بطولة صلاح ذو الفقار.', image: 'https://placehold.co/400x300/FF9F43/FFFFFF?text=الرجل+الذي+فقد+ظله' },
    { id: 12, name: 'زوجتي والكلب', details: 'فيلم درامي عام 1971 بطولة سعاد حسني.', image: 'https://placehold.co/400x300/2D3436/FFFFFF?text=زوجتي+والكلب' },
    { id: 13, name: 'صغيرة على الحب', details: 'فيلم رومانسي عام 1966 بطولة سعاد حسني.', image: 'https://placehold.co/400x300/0984E3/FFFFFF?text=صغيرة+على+الحب' },
    { id: 14, name: 'الكرنك', details: 'فيلم درامي سياسي عام 1975 عن فترة الناصرية.', image: 'https://placehold.co/400x300/00CEC9/FFFFFF?text=الكرنك' },
    { id: 15, name: 'الليلة الكبيرة', details: 'فيلم موسيقي عام 1961 عن المولد الشعبي.', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=الليلة+الكبيرة' },
    { id: 16, name: 'على من نطلق الرصاص', details: 'فيلم درامي عام 1975 بطولة محمود ياسين.', image: 'https://placehold.co/400x300/FDCB6E/000000?text=على+من+نطلق+الرصاص' },
    { id: 17, name: 'الاختيار', details: 'فيلم درامي عام 1971 بطولة إيهاب نافع.', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=الاختيار' },
    { id: 18, name: 'أميرة حبي أنا', details: 'فيلم رومانسي عام 1974 بطولة حسين فهمي.', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=أميرة+حبي+أنا' },
    { id: 19, name: 'الجوع', details: 'فيلم درامي عام 1986 بطولة سعاد نصر.', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=الجوع' },
    { id: 20, name: 'شفيقة ومتولي', details: 'فيلم درامي عام 1978 بطولة أحمد زكي.', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=شفيقة+ومتولي' },
  ],
  'tv-series': [
    { id: 1, name: 'ليالي الحلمية', details: 'مسلسل درامي عن الحياة المصرية عبر عقود.', image: 'https://placehold.co/400x300/2D3436/FFFFFF?text=ليالي+الحلمية' },
    { id: 2, name: 'رأفت الهجان', details: 'مسلسل تجسس عن قصة حقيقية في مصر.', image: 'https://placehold.co/400x300/0984e3/FFFFFF?text=رأفت+الهجان' },
    { id: 3, name: 'يوميات ونيس', details: 'مسلسل كوميدي عائلي بطولة محمد صبحي.', image: 'https://placehold.co/400x300/00cec9/FFFFFF?text=يوميات+ونيس' },
    { id: 4, name: 'بكيزة وزغلول', details: 'مسلسل كوميدي بطولة إسعاد يونس وسعاد نصر.', image: 'https://placehold.co/400x300/2d3436/FFFFFF?text=بكيزة+وزغلول' },
    { id: 5, name: 'الوسية', details: 'مسلسل درامي عن صراعات عائلية حول الميراث.', image: 'https://placehold.co/400x300/6c5ce7/FFFFFF?text=الوسية' },
    { id: 6, name: 'لن أعيش في جلباب أبي', details: 'مسلسل درامي عن صعود شاب فقير.', image: 'https://placehold.co/400x300/a29bfe/FFFFFF?text=لن+أعيش+في+جلباب+أبي' },
    { id: 7, name: 'المال والبنون', details: 'مسلسل درامي عن صراعات المال والسلطة.', image: 'https://placehold.co/400x300/fdcb6e/000000?text=المال+والبنون' },
    { id: 8, name: 'دموع في عيون وقحة', details: 'مسلسل درامي عن قصة حياة درامية.', image: 'https://placehold.co/400x300/e17055/FFFFFF?text=دموع+في+عيون+وقحة' },
    { id: 9, name: 'زيزينيا', details: 'مسلسل تاريخي عن الحياة في الإسكندرية.', image: 'https://placehold.co/400x300/00b894/FFFFFF?text=زيزينيا' },
    { id: 10, name: 'وجه القمر', details: 'مسلسل درامي بطولة فاتن حمامة.', image: 'https://placehold.co/400x300/fd79a8/FFFFFF?text=وجه+القمر' },
    { id: 11, name: 'هوانم جاردن سيتي', details: 'مسلسل درامي عن الحياة الاجتماعية في مصر.', image: 'https://placehold.co/400x300/FF9F43/FFFFFF?text=هوانم+جاردن+سيتي' },
    { id: 12, name: 'الإمام الغزالي', details: 'مسلسل تاريخي عن حياة العالم الإسلامي.', image: 'https://placehold.co/400x300/2D3436/FFFFFF?text=الإمام+الغزالي' },
    { id: 13, name: 'أبو العلا البشري', details: 'مسلسل تاريخي عن شخصية مصرية بارزة.', image: 'https://placehold.co/400x300/0984E3/FFFFFF?text=أبو+العلا+البشري' },
    { id: 14, name: 'أنا وأنتي', details: 'مسلسل كوميدي بطولة شريف منير.', image: 'https://placehold.co/400x300/00CEC9/FFFFFF?text=أنا+وأنتي' },
    { id: 15, name: 'الجماعة', details: 'مسلسل تاريخي عن جماعة الإخوان المسلمين.', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=الجماعة' },
    { id: 16, name: 'أفراح القبة', details: 'مسلسل درامي مقتبس من رواية نجيب محفوظ.', image: 'https://placehold.co/400x300/FDCB6E/000000?text=أفراح+القبة' },
    { id: 17, name: 'السرايا', details: 'مسلسل درامي عن الحياة في مصر القديمة.', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=السرايا' },
    { id: 18, name: 'حديث الصباح والمساء', details: 'مسلسل درامي مقتبس من رواية نجيب محفوظ.', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=حديث+الصباح+والمساء' },
    { id: 19, name: 'سلسال الدم', details: 'مسلسل درامي عن صراعات عائلية.', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=سلسال+الدم' },
    { id: 20, name: 'حرب أهلية', details: 'مسلسل درامي عن صراعات عائلية واجتماعية.', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=حرب+أهلية' },
  ],
  'countries': [
    { "id": 1, "name": "اليابان", "details": "دولة جزرية في شرق آسيا، معروفة بالتكنولوجيا والثقافة.", "image": "images/countries/1.jpg" },
  { "id": 2, "name": "البرازيل", "details": "أكبر دولة في أمريكا الجنوبية، مشهورة بكرة القدم وغابات الأمازون.", "image": "images/countries/2.jpg" },
  { "id": 3, "name": "النرويج", "details": "دولة إسكندنافية معروفة بالمضايق البحرية والأضواء الشمالية.", "image": "images/countries/3.jpg" },
  { "id": 4, "name": "مصر", "details": "حضارة قديمة، موطن الأهرامات ونهر النيل.", "image": "images/countries/4.jpg" },
  { "id": 5, "name": "أستراليا", "details": "دولة قارية، معروفة بالحياة البرية الفريدة والبراري.", "image": "images/countries/5.jpg" },
  { "id": 6, "name": "كندا", "details": "ثاني أكبر دولة من حيث المساحة، معروفة بشراب القيقب.", "image": "images/countries/6.jpg" },
  { "id": 7, "name": "الهند", "details": "أكثر دول العالم سكانًا، مهد اليوغا والكاري.", "image": "images/countries/7.jpg" },
  { "id": 8, "name": "آيسلندا", "details": "دولة جزرية نوردية معروفة بالينابيع الحارة والأنهار الجليدية.", "image": "images/countries/8.jpg" },
  { "id": 9, "name": "المغرب", "details": "دولة شمال إفريقية، بوابة بين إفريقيا وأوروبا.", "image": "images/countries/9.jpg" },
  { "id": 10, "name": "كوريا الجنوبية", "details": "دولة شرق آسيوية، رائدة عالميًا في التكنولوجيا والكي-بوب.", "image": "images/countries/10.jpg" },
  { "id": 11, "name": "جنوب إفريقيا", "details": "دولة إفريقية، معروفة بتنوعها الثقافي.", "image": "images/countries/11.jpg" },
  { "id": 12, "name": "إيطاليا", "details": "دولة أوروبية، موطن الفن والتاريخ الروماني.", "image": "images/countries/12.jpg" },
  { "id": 13, "name": "فرنسا", "details": "دولة أوروبية، معروفة بالفنون والثقافة.", "image": "images/countries/13.jpg" },
  { "id": 14, "name": "المكسيك", "details": "دولة أمريكا اللاتينية، معروفة بالتراث المكسيكي.", "image": "images/countries/14.jpg" },
  { "id": 15, "name": "نيجيريا", "details": "دولة إفريقية، مركز ثقافي واقتصادي.", "image": "images/countries/15.jpg" },
  { "id": 16, "name": "روسيا", "details": "أكبر دولة في العالم من حيث المساحة.", "image": "images/countries/16.jpg" },
  { "id": 17, "name": "الأرجنتين", "details": "دولة أمريكا الجنوبية، موطن التانغو.", "image": "images/countries/17.jpg" },
  { "id": 18, "name": "تركيا", "details": "دولة بين آسيا وأوروبا، معروفة بالتاريخ العثماني.", "image": "images/countries/18.jpg" },
  { "id": 19, "name": "السعودية", "details": "دولة عربية، مركز ديني وثقافي.", "image": "images/countries/19.jpg" },
  { "id": 20, "name": "إسبانيا", "details": "دولة أوروبية، معروفة بالفلامنكو والتاريخ.", "image": "images/countries/20.jpg" }
],
  'capitals': [
    { id: 1, name: 'طوكيو', details: 'عاصمة اليابان، مركز التكنولوجيا والثقافة.', image: 'https://placehold.co/400x300/FF6B6B/FFFFFF?text=طوكيو' },
    { id: 2, name: 'برازيليا', details: 'عاصمة البرازيل، معروفة بهندستها المعمارية الحديثة.', image: 'https://placehold.co/400x300/4ECDC4/FFFFFF?text=برازيليا' },
    { id: 3, name: 'أوسلو', details: 'عاصمة النرويج، تقع بين الغابات والمضايق.', image: 'https://placehold.co/400x300/45B7D1/FFFFFF?text=أوسلو' },
    { id: 4, name: 'القاهرة', details: 'عاصمة مصر، موطن الأهرامات ومتحف الحضارة.', image: 'https://placehold.co/400x300/FFEAA7/000000?text=القاهرة' },
    { id: 5, name: 'كانبيرا', details: 'عاصمة أستراليا، مدينة مخططة بعناية.', image: 'https://placehold.co/400x300/96CEB4/FFFFFF?text=كانبيرا' },
    { id: 6, name: 'أوتاوا', details: 'عاصمة كندا، معروفة بمبانيها التاريخية.', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=أوتاوا' },
    { id: 7, name: 'نيودلهي', details: 'عاصمة الهند، مركز سياسي وثقافي.', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=نيودلهي' },
    { id: 8, name: 'رييكيافيك', details: 'عاصمة آيسلندا، أصغر عاصمة نوردية.', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=رييكيافيك' },
    { id: 9, name: 'الرباط', details: 'عاصمة المغرب، تقع على المحيط الأطلسي.', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=الرباط' },
    { id: 10, name: 'سيول', details: 'عاصمة كوريا الجنوبية، مركز التكنولوجيا والكي-بوب.', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=سيول' },
    { id: 11, name: 'بريتوريا', details: 'عاصمة جنوب إفريقيا الإدارية.', image: 'https://placehold.co/400x300/FF9F43/FFFFFF?text=بريتوريا' },
    { id: 12, name: 'روما', details: 'عاصمة إيطاليا، موطن الكولوسيوم.', image: 'https://placehold.co/400x300/2D3436/FFFFFF?text=روما' },
    { id: 13, name: 'باريس', details: 'عاصمة فرنسا، مدينة النور والفنون.', image: 'https://placehold.co/400x300/0984E3/FFFFFF?text=باريس' },
    { id: 14, name: 'مكسيكو سيتي', details: 'عاصمة المكسيك، مركز ثقافي تاريخي.', image: 'https://placehold.co/400x300/00CEC9/FFFFFF?text=مكسيكو+سيتي' },
    { id: 15, name: 'أبوجا', details: 'عاصمة نيجيريا، مدينة مخططة حديثة.', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=أبوجا' },
    { id: 16, name: 'موسكو', details: 'عاصمة روسيا، موطن الكرملين.', image: 'https://placehold.co/400x300/FDCB6E/000000?text=موسكو' },
    { id: 17, name: 'بوينس آيرس', details: 'عاصمة الأرجنتين، مركز التانغو.', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=بوينس+آيرس' },
    { id: 18, name: 'أنقرة', details: 'عاصمة تركيا، مركز سياسي.', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=أنقرة' },
    { id: 19, name: 'الرياض', details: 'عاصمة السعودية، مركز اقتصادي.', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=الرياض' },
    { id: 20, name: 'مدريد', details: 'عاصمة إسبانيا، معروفة بالمتاحف.', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=مدريد' },
  ],
  'famous-people': [
    { id: 1, name: 'أم كلثوم', details: 'مغنية مصرية، لقبت بكوكب الشرق.', image: 'https://placehold.co/400x300/FF6B6B/FFFFFF?text=أم+كلثوم' },
    { id: 2, name: 'عادل إمام', details: 'ممثل كوميدي ودرامي، زعيم الفن المصري.', image: 'https://placehold.co/400x300/4ECDC4/FFFFFF?text=عادل+إمام' },
    { id: 3, name: 'أحمد زكي', details: 'ممثل مصري، اشتهر بأدوار تاريخية وواقعية.', image: 'https://placehold.co/400x300/45B7D1/FFFFFF?text=أحمد+زكي' },
    { id: 4, name: 'فاتن حمامة', details: 'ممثلة مصرية، سيدة الشاشة العربية.', image: 'https://placehold.co/400x300/FFEAA7/000000?text=فاتن+حمامة' },
    { id: 5, name: 'محمد منير', details: 'مغني مصري، يُلقب بالكينج.', image: 'https://placehold.co/400x300/96CEB4/FFFFFF?text=محمد+منير' },
    { id: 6, name: 'سعاد حسني', details: 'ممثلة مصرية، سندريلا السينما العربية.', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=سعاد+حسني' },
    { id: 7, name: 'نجيب محفوظ', details: 'روائي مصري، حائز على جائزة نوبل للأدب.', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=نجيب+محفوظ' },
    { id: 8, name: 'عمر الشريف', details: 'ممثل مصري، اشتهر عالميًا في هوليوود.', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=عمر+الشريف' },
    { id: 9, name: 'محمد صلاح', details: 'لاعب كرة قدم مصري، نجم ليفربول.', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=محمد+صلاح' },
    { id: 10, name: 'إسعاد يونس', details: 'ممثلة ومنتجة مصرية، مقدمة برامج.', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=إسعاد+يونس' },
    { id: 11, name: 'محمود ياسين', details: 'ممثل مصري، اشتهر بأدوار درامية متنوعة.', image: 'https://placehold.co/400x300/FF9F43/FFFFFF?text=محمود+ياسين' },
    { id: 12, name: 'نور الشريف', details: 'ممثل مصري، نجم السينما والتلفزيون.', image: 'https://placehold.co/400x300/2D3436/FFFFFF?text=نور+الشريف' },
    { id: 13, name: 'هدى سلطان', details: 'ممثلة ومغنية مصرية، نجمة الزمن الجميل.', image: 'https://placehold.co/400x300/0984E3/FFFFFF?text=هدى+سلطان' },
    { id: 14, name: 'سميرة أحمد', details: 'ممثلة مصرية، اشتهرت في الدراما التلفزيونية.', image: 'https://placehold.co/400x300/00CEC9/FFFFFF?text=سميرة+أحمد' },
    { id: 15, name: 'عبد الحليم حافظ', details: 'مغني وممثل مصري، العندليب الأسمر.', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=عبد+الحليم+حافظ' },
    { id: 16, name: 'محمد فوزي', details: 'مغني وملحن مصري، رائد الموسيقى العربية.', image: 'https://placehold.co/400x300/FDCB6E/000000?text=محمد+فوزي' },
    { id: 17, name: 'تحية كاريوكا', details: 'راقصة وممثلة مصرية، رمز الفن الشعبي.', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=تحية+كاريوكا' },
    { id: 18, name: 'محمد هنيدي', details: 'ممثل كوميدي مصري، نجم الأفلام الشعبية.', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=محمد+هنيدي' },
    { id: 19, name: 'يحيى الفخراني', details: 'ممثل مصري، اشتهر بالدراما التاريخية.', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=يحيى+الفخراني' },
    { id: 20, name: 'ليلى مراد', details: 'ممثلة ومغنية مصرية، نجمة العصر الذهبي.', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=ليلى+مراد' },
  ],
  'video-games': [
    { id: 1, name: 'The Legend of Zelda', details: 'لعبة مغامرات من نينتندو، صدرت عام 1986.', image: 'https://placehold.co/400x300/FF6B6B/FFFFFF?text=Zelda' },
    { id: 2, name: 'Minecraft', details: 'لعبة بناء وعالم مفتوح، الأكثر مبيعًا عالميًا.', image: 'https://placehold.co/400x300/4ECDC4/FFFFFF?text=Minecraft' },
    { id: 3, name: 'Grand Theft Auto V', details: 'لعبة أكشن وعالم مفتوح من روكستار.', image: 'https://placehold.co/400x300/45B7D1/FFFFFF?text=GTA+V' },
    { id: 4, name: 'FIFA', details: 'لعبة محاكاة كرة القدم من EA Sports.', image: 'https://placehold.co/400x300/FFEAA7/000000?text=FIFA' },
    { id: 5, name: 'The Last of Us', details: 'لعبة أكشن ومغامرات من نوتي دوغ.', image: 'https://placehold.co/400x300/96CEB4/FFFFFF?text=The+Last+of+Us' },
    { id: 6, name: 'Fortnite', details: 'لعبة باتل رويال مجانية من إيبك غيمز.', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=Fortnite' },
    { id: 7, name: 'Call of Duty', details: 'سلسلة ألعاب إطلاق نار من أكتيفيجن.', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=Call+of+Duty' },
    { id: 8, name: 'Red Dead Redemption 2', details: 'لعبة غربية ملحمية من روكستار.', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=Red+Dead+Redemption' },
    { id: 9, name: 'Super Mario', details: 'لعبة كلاسيكية من نينتندو.', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=Super+Mario' },
    { id: 10, name: 'Elden Ring', details: 'لعبة تقمص أدوار من فرام سوفتوير.', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=Elden+Ring' },
    { id: 11, name: 'Assassin’s Creed', details: 'لعبة مغامرات تاريخية من يوبيسوفت.', image: 'https://placehold.co/400x300/FF9F43/FFFFFF?text=Assassin’s+Creed' },
    { id: 12, name: 'The Witcher 3', details: 'لعبة تقمص أدوار ملحمية من CD Projekt.', image: 'https://placehold.co/400x300/2D3436/FFFFFF?text=The+Witcher+3' },
    { id: 13, name: 'Overwatch', details: 'لعبة إطلاق نار جماعية من بليزارد.', image: 'https://placehold.co/400x300/0984E3/FFFFFF?text=Overwatch' },
    { id: 14, name: 'Cyberpunk 2077', details: 'لعبة خيال علمي من CD Projekt.', image: 'https://placehold.co/400x300/00CEC9/FFFFFF?text=Cyberpunk+2077' },
    { id: 15, name: 'Among Us', details: 'لعبة متعددة اللاعبين عن الخداع والتعاون.', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=Among+Us' },
    { id: 16, name: 'Pokémon', details: 'سلسلة ألعاب تقمص أدوار من نينتندو.', image: 'https://placehold.co/400x300/FDCB6E/000000?text=Pokémon' },
    { id: 17, name: 'Resident Evil', details: 'سلسلة ألعاب رعب من كابكوم.', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=Resident+Evil' },
    { id: 18, name: 'Final Fantasy', details: 'سلسلة ألعاب تقمص أدوار من سكوير إنكس.', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=Final+Fantasy' },
    { id: 19, name: 'Hollow Knight', details: 'لعبة مغامرات مستقلة من Team Cherry.', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=Hollow+Knight' },
    { id: 20, name: 'God of War', details: 'لعبة أكشن ملحمية من سانتا مونيكا.', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=God+of+War' },
  ],
  'supermarket': [
    { id: 1, name: 'خبز', details: '', image: 'https://placehold.co/400x300/FF6B6B/FFFFFF?text=خبز' },
    { id: 2, name: 'حليب', details: '', image: 'https://placehold.co/400x300/4ECDC4/FFFFFF?text=حليب' },
    { id: 3, name: 'بيض', details: '', image: 'https://placehold.co/400x300/45B7D1/FFFFFF?text=بيض' },
    { id: 4, name: 'جبن', details: '', image: 'https://placehold.co/400x300/FFEAA7/000000?text=جبن' },
    { id: 5, name: 'ماء', details: '', image: 'https://placehold.co/400x300/96CEB4/FFFFFF?text=ماء' },
    { id: 6, name: 'أرز', details: '', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=أرز' },
    { id: 7, name: 'معكرونة', details: '', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=معكرونة' },
    { id: 8, name: 'زيت زيتون', details: '', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=زيت+زيتون' },
    { id: 9, name: 'سكر', details: '', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=سكر' },
    { id: 10, name: 'قهوة', details: '', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=قهوة' },
    { id: 11, name: 'شاي', details: '', image: 'https://placehold.co/400x300/FF9F43/FFFFFF?text=شاي' },
    { id: 12, name: 'دقيق', details: '', image: 'https://placehold.co/400x300/2D3436/FFFFFF?text=دقيق' },
    { id: 13, name: 'زبدة', details: '', image: 'https://placehold.co/400x300/0984E3/FFFFFF?text=زبدة' },
    { id: 14, name: 'عسل', details: '', image: 'https://placehold.co/400x300/00CEC9/FFFFFF?text=عسل' },
    { id: 15, name: 'ملح', details: '', image: 'https://placehold.co/400x300/6C5CE7/FFFFFF?text=ملح' },
    { id: 16, name: 'خل', details: '', image: 'https://placehold.co/400x300/FDCB6E/000000?text=خل' },
    { id: 17, name: 'تونة', details: '', image: 'https://placehold.co/400x300/E17055/FFFFFF?text=تونة' },
    { id: 18, name: 'مربى', details: '', image: 'https://placehold.co/400x300/FD79A8/FFFFFF?text=مربى' },
    { id: 19, name: 'زيت نباتي', details: '', image: 'https://placehold.co/400x300/A29BFE/FFFFFF?text=زيت+نباتي' },
    { id: 20, name: 'شوكولاتة', details: '', image: 'https://placehold.co/400x300/00B894/FFFFFF?text=شوكولاتة' },
  ],
  'fruits-veggies': [
    { id: 1, name: 'تفاح', details: '', image: 'images/fruits-veggies/1.jpg' },
    { id: 2, name: 'موز', details: '', image: 'images/fruits-veggies/2.jpg'},
    { id: 3, name: 'جزر', details: '', image: 'images/fruits-veggies/3.jpg'},
    { id: 4, name: 'بروكلي', details: '', image: 'images/fruits-veggies/4.jpg'},
    { id: 5, name: 'فراولة', details: '', image: 'images/fruits-veggies/5.jpg' },
    { id: 6, name: 'طماطم', details: '', image: 'images/fruits-veggies/6.jpg' },
    { id: 7, name: 'سبانخ', details: '', image: 'images/fruits-veggies/7.jpg' },
    { id: 8, name: 'مانجو', details: '', image: 'images/fruits-veggies/8.jpg' },
    { id: 9, name: 'بطاطس', details: '', image: 'images/fruits-veggies/9.jpg' },
    { id: 10, name: 'عنب', details: '', image: 'images/fruits-veggies/10.jpg' },
    { id: 11, name: 'برتقال', details: '', image: 'images/fruits-veggies/11.jpg' },
    { id: 12, name: 'خيار', details: '', image: 'images/fruits-veggies/12.jpg'},
    { id: 13, name: 'كمثرى', details: '', image: 'images/fruits-veggies/13.jpg' },
    { id: 14, name: 'بصل', details: '', image: 'images/fruits-veggies/14.jpg' },
    { id: 15, name: 'رمان', details: '', image: 'images/fruits-veggies/15.jpg' },
    { id: 16, name: 'خس', details: '', image: 'images/fruits-veggies/16.jpg' },
    { id: 17, name: 'تين', details: '', image: 'images/fruits-veggies/17.jpg' },
    { id: 18, name: 'كوسا', details: '', image: 'images/fruits-veggies/18.jpg' },
    { id: 19, name: 'بطيخ', details: '', image: 'images/fruits-veggies/19.jpg' },
    { id: 20, name: 'فلفل', details: '', image: 'images/fruits-veggies/20.jpg' },
  ],
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [gameCode, setGameCode] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [players, setPlayers] = useState({ player1: 'اللاعب الأول', player2: 'اللاعب الثانى' });
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  const password = "PLAY125"
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

  const shuffleCard1 = () => {
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
      [player]: name 
    //  || `اللاعب ${player === 'player1' ? 'الأول' : 'الثانى'}`
    }));
  };





  // Add these new state variables to your component
const [availableCards, setAvailableCards] = useState([]);
const [usedCards, setUsedCards] = useState([]);
// Updated shuffleCard function
const shuffleCard = () => {
  if (!selectedCategory) return;
  
  const categoryData = CATEGORY_DATA[selectedCategory.id] || [];
  
  // If no available cards or different category, reset the deck
  if (availableCards.length === 0 || 
      !availableCards.some(card => categoryData.includes(card))) {
    // Shuffle all cards for this category and reset
    const shuffledCards = shuffleArray(categoryData);
    setAvailableCards(shuffledCards);
    setUsedCards([]);
    
    // Pick the first card from shuffled deck
    const nextCard = shuffledCards[0];
    setCurrentCard(nextCard);
    setAvailableCards(shuffledCards.slice(1));
    setUsedCards([nextCard]);
  } else {
    // Pick the next card from available cards
    const nextCard = availableCards[0];
    setCurrentCard(nextCard);
    setAvailableCards(availableCards.slice(1));
    setUsedCards([...usedCards, nextCard]);
  }
  
  setCardRevealed(false);
};
// Optional: Reset deck function (you can add a button for this)
const resetDeck = () => {
  setAvailableCards([]);
  setUsedCards([]);
};

// Update the category selection to reset the deck when changing categories
const handleCategorySelect = (category) => {
  setSelectedCategory(category);
  setCurrentPage('game');
  
  // Reset deck for new category
  setAvailableCards([]);
  setUsedCards([]);
  
  // Set initial card
  const categoryData = CATEGORY_DATA[category.id] || [];
  if (categoryData.length > 0) {
    const shuffledCards = shuffleArray(categoryData);
    const firstCard = shuffledCards[0];
    
    setCurrentCard(firstCard);
    setAvailableCards(shuffledCards.slice(1));
    setUsedCards([firstCard]);
    setCardRevealed(false);
  }
};

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col">
        {/* Navbar */}
        <nav className="w-full p-4">
          <div className="flex justify-center">
            <img src="/vite.svg"
      alt="Logo" className="text-2xl font-bold text-white cursor-pointer" onClick={() => setCurrentPage('landing')}>
            </img>
          </div>
        </nav>
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center p-6 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-2">خـمن صـح</h2>
            <p className="text-white/80 mb-8">جـاهـز للـتـحـدى؟</p>
            
            {/* Game Modes */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 text-white/90 justify-end">
                <span className="text-sm">تحدى ربعك</span>
                <Users className="w-5 h-5" />
              </div>
              <div className="flex items-center space-x-3 text-white/90 justify-end">
                <span className="text-sm">تقدر تلعب بجوال واحد أو أكثر</span>
                <Smartphone className="w-5 h-5" />
              </div>
            </div>
            {/* Game Code Input */}
            <div className="mb-6">
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                placeholder="أدخل الكود"
                autocomplete="on"
                className="w-full p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 text-center text-lg font-mono focus:outline-none focus:ring-2 focus:ring-white/50"
              />
             <span className="text-sm text-white/90 ">Hint: PLAY*</span>
            </div>

            {/* Enter Game Button */}
            <button
              onClick={() =>{if(gameCode==password) {setCurrentPage('categories')}else{toast("تأكد من الكود")}}}
              className="w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center space-x-2 text-lg"
            >
              <span>ابدأ اللعبة</span>
              <ChevronRight className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Footer */}
        <footer className="p-4 text-center text-white/60 text-sm">
         خمن صح © 2025 - جميع الحقوق محفوظة
        </footer>
         <ToastContainer />
      </div>
    );
  }

  // Categories Page
  if (currentPage === 'categories') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="w-full p-4 bg-white shadow-sm">
          <div className="flex justify-center">
            <img  img src="/vite.svg"
      alt="Logo" className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={() => setCurrentPage('landing')}>

            </img>
          </div>
        </nav>

        {/* Categories Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
            {GAME_CATEGORIES.map((category) => (
              <button
                key={category.id}
          onClick={() => handleCategorySelect(category)}
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
          <div className="flex justify-center">
            <img  img src="/vite.svg"
      alt="Logo" className="text-xl font-bold text-gray-800 cursor-pointer" onClick={() => setCurrentPage('landing')}>
            </img>
          </div>
        </nav>

        <div className="p-4 max-w-md mx-auto">
          {/* Game Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="text-center p-4">
               <h3 className="text-2xl font-bold text-gray-800">{selectedCategory.name}</h3>
            </div>
            {/* Image Container */}
            <div className="aspect-[1/1] bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={currentCard.image}
                alt={cardRevealed ? currentCard.name : 'Mystery item'}
                className="w-full h-full object-contain object-position-center"
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
                  <h3 className="text-2xl font-bold text-gray-400 mb-2">ابدأ التحدى</h3>
                  <p className="text-gray-400">الحين وقت الأسئلة</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={shuffleCard}
              className="bg-blue-400 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-600 transition-colors"
            >
              <Shuffle className="w-5 h-5" />
              <span>بطاقة جديدة</span>
            </button>
            
            <button
              onClick={() => setCardRevealed(!cardRevealed)}
              className="bg-purple-400 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-purple-600 transition-colors"
            >
              <Eye className="w-5 h-5" />
              <span>{cardRevealed ? 'إخفاء' : 'عرض'}</span>
            </button>
          </div>


          {/* Scoreboard */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 mt-6 relative">
            <button
              onClick={resetScores}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            <div className="grid grid-cols-2 gap-4">

                {/* Player 2 */}
              <div className="text-center">
                <input
                  type="text"
                  value={players.player2}
                  onChange={(e) => updatePlayerName('player2', e.target.value)}
                   onFocus={(e) => e.target.select()}
                  className="w-full text-center font-semibold text-gray-800 bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 mb-2"
                />
                <div className="text-3xl font-bold text-purple-600 mb-2">{scores.player2}</div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => updateScore('player2', 1)}
                    className="bg-green-400 text-white p-2 rounded-full hover:bg-green-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateScore('player2', -1)}
                    className="bg-red-400 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>


              {/* Player 1 */}
              <div className="text-center">
                <input
                  type="text"
                  value={players.player1}
                  onChange={(e) => updatePlayerName('player1', e.target.value)}
                  onFocus={(e) => e.target.select()}
                  className="w-full text-center font-semibold text-gray-800 bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500 mb-2"
                />
                <div className="text-3xl font-bold text-blue-600 mb-2">{scores.player1}</div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => updateScore('player1', 1)}
                    className="bg-green-400 text-white p-2 rounded-full hover:bg-green-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => updateScore('player1', -1)}
                    className="bg-red-400 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>

            
            </div>
          </div>

          {/* Back to Categories */}
          <button
            onClick={() => setCurrentPage('categories')}
            className="w-full mt-4 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors"
          >
            ← رجوع
          </button>


        </div>
      </div>
    );
  }

  return <div>تحميل...</div>;
}

export default App;
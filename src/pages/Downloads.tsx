import { useState } from "react";
import { Download, Search, ChevronDown, ChevronUp, FileText, Layout, Video, Type, Font, Software, Cloud } from "lucide-react";

const Downloads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("essentials");

  const downloadCategories = [
    {
      id: "essentials",
      title: "📌 Essential Tools & Utilities",
      icon: <Software size={20} />,
      items: [
        { name: "Classic Menu for Office 2007", description: "Office 2007/2003/2013/2016/2024 compatibility" },
        { name: "Windows 10 Activator", description: "Activate Windows 10" },
        { name: "DeepFreeze", description: "For Windows 10 & Windows 7" },
        { name: "Timer", description: "Countdown timer for exams" },
      ]
    },
    {
      id: "graphics",
      title: "🎨 Graphics & Design",
      icon: <Layout size={20} />,
      items: [
        { name: "Adobe Photoshop", description: "Professional image editing" },
        { name: "Adobe PageMaker", description: "Desktop publishing software" },
        { name: "Macromedia Flash", description: "Animation & multimedia" },
        { name: "Macromedia Freehand", description: "Vector graphics editor" },
        { name: "Macromedia Dreamweaver", description: "Web development tool" },
      ]
    },
    {
      id: "video",
      title: "🎥 Video & Screen Recording",
      icon: <Video size={20} />,
      items: [
        { name: "Any Video Converter", description: "Convert video formats" },
        { name: "Screen Recorder", description: "Record screen activities" },
        { name: "Movie Maker", description: "Video editing software" },
      ]
    },
    {
      id: "typing",
      title: "⌨️ Typing Software",
      icon: <Type size={20} />,
      items: [
        { name: "Rapid Typing", description: "Typing tutor software" },
        { name: "Typshala", description: "Nepali typing practice" },
      ]
    },
    {
      id: "fonts",
      title: "🔤 Nepali Fonts",
      icon: <Font size={20} />,
      items: [
        { name: "Fontasy Himali", description: "Nepali font family" },
        { name: "Preeti Font", description: "Popular Nepali font" },
        { name: "Kalimati Font", description: "Nepali Unicode font" },
        { name: "Nepali Unicode (Traditional)", description: "Traditional Nepali typing" },
        { name: "Nepali Unicode (Romanized)", description: "Romanized Nepali typing" },
      ]
    },
    {
      id: "office",
      title: "📊 Office & Accounting",
      icon: <FileText size={20} />,
      items: [
        { name: "Save As PDF/XPS", description: "Export documents to PDF/XPS format" },
        { name: "Tally Accounting", description: "Accounting software" },
      ]
    }
  ];

  const filteredCategories = downloadCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Download size={32} className="text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">सफ्टवेर डाउनलोड</h1>
          <p className="text-gray-600">लोकसेवा परीक्षाको लागि आवश्यक सफ्टवेरहरू</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="सफ्टवेर खोज्नुहोस्..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
        </div>

        {/* Download Categories */}
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-600">{category.icon}</span>
                  <h2 className="text-lg font-semibold text-gray-800">{category.title}</h2>
                  <span className="text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {category.items.length}
                  </span>
                </div>
                {expandedCategory === category.id ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </button>

              {expandedCategory === category.id && (
                <div className="p-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                        <button
                          onClick={() => {
                            alert(`Download: ${item.name}\n\nAdd your download link here.`);
                          }}
                          className="ml-3 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                        >
                          <Download size={12} /> Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Download Instructions */}
        <div className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <span>ℹ️</span> डाउनलोड निर्देशन
          </h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>सबै सफ्टवेरहरू नि:शुल्क र परीक्षाको लागि मात्र हुन्</li>
            <li>डाउनलोड गर्न "Download" बटनमा क्लिक गर्नुहोस्</li>
            <li>कुनै समस्या भएमा सम्पर्क गर्नुहोला</li>
          </ul>
        </div>

        {/* Total Count */}
        <div className="mt-6 text-center text-sm text-gray-500">
          कुल {filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0)} वटा सफ्टवेरहरू उपलब्ध
        </div>
      </div>
    </div>
  );
};

export default Downloads;

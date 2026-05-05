import { useState } from "react";
import { Download, Search, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

const Downloads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>("essentials");

  // Download links mapping
  const getDownloadLink = (itemName: string): string => {
    const links: Record<string, string> = {
      "Office 2013": "https://www.mediafire.com/file/0dg3kvnqi56gqv4/Office-2013-PPVL-x86-en-US-Feb2014_Downloadha.com_.iso/file",
      "Office 2016": "https://www.mediafire.com/file/plxyv69stn6fvjn/Microsoft.Office.Pro-Plus.2016x86.v2017.09.rar/file",
      "Office 2024": "https://www.mediafire.com/file/blnctn11md0iqch/Microsoft_Office_2024_Pro_Plus_v2505_Build_18827.20150_for_Win_x64_%252B_Activator.zip/file",
      "Windows 10 Activator": "https://www.mediafire.com/file/60it0jee599s3fv/KMSpico_10.1.5_Final_%255BWindows_And_Office_Activator%255D_%255BM4Master%255D%255BTeamOS-HKRG%255D.rar/file",
      "DeepFreeze": "https://www.mediafire.com/file/7k5eklyblx3njqn/DeepFreeze_%255BWin10%255D.rar/file",
      "Timer": "https://www.mediafire.com/file/w11m5fo6syd9fso/SnapTimer.zip/file",
      "Any Video Converter": "https://www.mediafire.com/file/obj7oyxr3kxq6tk/avc-free.zip/file",
      "Screen Recorder": "https://www.mediafire.com/file/co4t5nqh54gshcg/FastStone_Capture.zip/file",
      "Movie Maker": "https://www.mediafire.com/file/5xb1531pt6r0lah/MovieMaker%2528win7%2529.zip/file",
      "Adobe Photoshop": "https://www.mediafire.com/file/qgbqgtwxi5a8h2r/Adobe_Photoshop_CS_8.zip/file",
      "Adobe PageMaker": "https://www.mediafire.com/file/1pqo13w9zdwz9gl/Adobe_PageMaker_7.zip/file",
      "Macromedia Flash": "https://www.mediafire.com/file/uwd0xa9elwo3dsi/Flash_8.zip/file",
      "Macromedia Dreamweaver": "https://www.mediafire.com/file/qb2r4180z5sp0zs/Macromedia_Dreamweaver_8.0.zip/file",
      "Macromedia Freehand": "https://www.mediafire.com/file/t87emjor7y8njb9/Macromedia_Freehand_MX_11.zip/file",
      "Fontasy Himali": "https://www.mediafire.com/file/2wdw0x620jauhi6/Fontasy_Himali.zip/file",
      "Preeti Font": "https://www.mediafire.com/file/w63c6w45ercvjpv/Preeti.zip/file",
      "Kalimati Font": "https://www.mediafire.com/file/8cvgnb0hfk8f4h2/Kalimati.zip/file",
      "Nepali Unicode": "https://www.mediafire.com/file/ec99vmuebwvmj14/Nepali_romanised.zip/file",
      "Rapid Typing": "https://www.mediafire.com/file/06ra63wulqajw59/RapidTyping_Portable_4.zip/file",
      "Typshala": "https://www.mediafire.com/file/nd9d9l6h2khbjsb/Typshala_%2528Complete%2529.zip/file",
      "Save As PDF/XPS": "https://www.mediafire.com/file/2qg6glb6qsq38fk/SaveAsPDFandXPS.zip/file",
      "Tally Accounting": "https://www.mediafire.com/file/b67kmp6skmwjnus/Tally_9.zip/file",
      "QBasic": "https://www.mediafire.com/file/qdbwh2f7uiphley/qbasic.zip/file",
    };
    
    return links[itemName] || "#";
  };

  const downloadCategories = [
    {
      id: "essentials",
      title: "📌 Essential Tools & Utilities",
      items: [
        { name: "Windows 10 Activator", description: "Activate Windows 10" },
        { name: "DeepFreeze", description: "For Windows 10 & Windows 7" },
        { name: "Timer", description: "Countdown timer for exams" },
        { name: "QBasic", description: "Programming language for beginners" },
      ]
    },
    {
      id: "office",
      title: "📊 Microsoft Office Suite",
      items: [
        { name: "Office 2013", description: "Microsoft Office 2013 ISO" },
        { name: "Office 2016", description: "Microsoft Office Pro Plus 2016" },
        { name: "Office 2024", description: "Microsoft Office 2024 Pro Plus" },
        { name: "Save As PDF/XPS", description: "Export documents to PDF/XPS format" },
      ]
    },
    {
      id: "graphics",
      title: "🎨 Graphics & Design",
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
      items: [
        { name: "Any Video Converter", description: "Convert video formats" },
        { name: "Screen Recorder", description: "Record screen activities (FastStone Capture)" },
        { name: "Movie Maker", description: "Video editing software" },
      ]
    },
    {
      id: "typing",
      title: "⌨️ Typing Software",
      items: [
        { name: "Rapid Typing", description: "Typing tutor software" },
        { name: "Typshala", description: "Nepali typing practice" },
      ]
    },
    {
      id: "fonts",
      title: "🔤 Nepali Fonts",
      items: [
        { name: "Fontasy Himali", description: "Nepali font family" },
        { name: "Preeti Font", description: "Popular Nepali font" },
        { name: "Kalimati Font", description: "Nepali Unicode font" },
        { name: "Nepali Unicode", description: "Traditional/Romanized Nepali typing" },
      ]
    },
    {
      id: "accounting",
      title: "💰 Accounting Software",
      items: [
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

  const handleDownload = (itemName: string) => {
    const link = getDownloadLink(itemName);
    if (link && link !== "#") {
      window.open(link, "_blank");
    } else {
      alert(`Download link for ${itemName} will be added soon.`);
    }
  };

  const getIcon = (title: string) => {
    if (title.includes("Essential")) return "🛠️";
    if (title.includes("Office")) return "📊";
    if (title.includes("Graphics")) return "🎨";
    if (title.includes("Video")) return "🎥";
    if (title.includes("Typing")) return "⌨️";
    if (title.includes("Fonts")) return "🔤";
    if (title.includes("Accounting")) return "💰";
    return "📦";
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
                  <span className="text-2xl">{getIcon(category.title)}</span>
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
                          onClick={() => handleDownload(item.name)}
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
            <li>MediaFire मा हुनुहुन्छ भने "Download" बटनमा क्लिक गर्नुहोस्</li>
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

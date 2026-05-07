import { useState } from "react";
import { 
  BookOpen, Search, ChevronRight, ChevronDown, 
  Printer, FileText, Database, Presentation, 
  Globe, Shield, HardDrive, Cpu, Monitor, Keyboard,
  Menu, X, ChevronUp
} from "lucide-react";

const SubjectiveQuestions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openTopics, setOpenTopics] = useState<Record<string, boolean>>({});

  const toggleTopic = (topicId: string) => {
    setOpenTopics(prev => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const topics = [
    {
      id: "fundamental",
      title: "💻 Computer Fundamental",
      icon: <Cpu size={20} />,
      color: "from-blue-500 to-cyan-500",
      questions: [
        "Write about important inventions in history of computer.",
        "What are the characteristics of computer?",
        "Write about features of each generation of computer.",
        "What are the types of computer?",
        "Write any 5 fields where computer is used.",
        "Write about input and output devices.",
        "Write about CPU. What is CPU Cycle?",
        "Why is Charles Babbage called father of computer?",
        "What characteristics of computer have made it useful in our daily life?",
        "Write about Biometric Devices.",
        "Explain Computer Architecture with a block diagram.",
        "Explain computer memory with its types.",
        "What is printer? What are its types?",
        "Define Secondary Memory. Write about different components of hard disk.",
        "How virtual memory and cache memory increase performance of computer?",
        "Why is cache memory called buffer memory?",
        "How virtual memory increases performance of computer?",
        "Write about different types of software.",
        "Mention different types of programming language and language processors.",
        "Write the features of different language processors.",
        "What are the fields where multimedia is used?",
        "Write advantages of multimedia.",
        "Importance of using Unicode encoding system.",
        "Define computer hardware with its types.",
        "Differentiate Interpreter and Compiler."
      ]
    },
    {
      id: "differentiate",
      title: "🔄 Differentiate",
      icon: <Menu size={20} />,
      color: "from-purple-500 to-pink-500",
      questions: [
        "Hardcopy and Softcopy output device",
        "Direct and indirect entry input device",
        "Impact and non impact printer",
        "RAM and ROM",
        "SRAM and DRAM",
        "Primary and Secondary Memory",
        "Data and Information",
        "Sequential and random access memory",
        "Application Software and System Software",
        "Packaged Software and Tailored Software",
        "High Level and Low Level Language",
        "Interpreter and compiler",
        "Firmware and Cache Memory",
        "Firmware and Operating System",
        "ASCII and Unicode"
      ]
    },
    {
      id: "operating-system",
      title: "🖥️ Operating System",
      icon: <Monitor size={20} />,
      color: "from-green-500 to-emerald-500",
      questions: [
        "What are the types of operating system?",
        "Write functions of operating system.",
        "Write about different types of files.",
        "Differentiate Operating System and Firmware.",
        "Write about rules for naming file.",
        "Define DOS commands. Differentiate Internal and External Commands.",
        "What are commands and attributes?",
        "What are different types of DOS commands?",
        "What is control panel? What are its functions?",
        "Define Windows Operating System. Write about important components of windows.",
        "What are benefits of GUI over CLI?",
        "Write about 5 components of windows OS.",
        "What are the ways of file management in MS windows?",
        "Mention permanent desktop icons in windows. How can you manipulate icons?",
        "Write about any 5 features/components of control panel.",
        "Write about different types of file with their extension.",
        "How can you customize taskbar?",
        "Define system tools with examples.",
        "Write about different components of windows accessories.",
        "Differentiate: CLI and GUI, internal and external commands, command and attributes, cold boot and warm boot, files and folders.",
        "What are the basic measures that you can take in order to tune and maximize the performance of windows OS?"
      ]
    },
    {
      id: "word-processing",
      title: "📝 Word Processing",
      icon: <FileText size={20} />,
      color: "from-red-500 to-orange-500",
      questions: [
        "Write about elements of word processing environment based on MS Word.",
        "Write about different formatting options in MS word.",
        "What are the listing styles available in MS word?",
        "Write about different character formatting and paragraph formatting options.",
        "Write about different editing tools available in MS Word.",
        "Write about different page set up options.",
        "What do you mean by default setting. Write about default setting of MS Word application.",
        "What are the features of Word Processing Software?",
        "Write any 5 features of MS Word.",
        "What is default setting? How can you change default font setting? give example.",
        "Write use of table in MS word.",
        "What benefits you can get from newspaper column styles in MS word?",
        "Write about different options of header/footer in MS Word.",
        "What is mail merge? What is its uses in an organization? Write steps to perform mail merge.",
        "Write about Security Features in MS Word.",
        "What are the advantages of mail merge? How can you use it?",
        "Write different security techniques available in MS Word.",
        "What are the uses of watermark in MS Word?",
        "Differentiate: Status Bar and Scroll bar, Menu bar and status bar, tab and indentation, hyperlink and bookmark, citation and bibliography, footnote and endnote, hyperlink and embedding, save and save as"
      ]
    },
    {
      id: "spreadsheet",
      title: "📊 Spreadsheet",
      icon: <Database size={20} />,
      color: "from-green-500 to-teal-500",
      questions: [
        "What is chart? What are uses of chart?",
        "What is spreadsheet? What are the different data types in MS Excel?",
        "What are the uses of Spreadsheet in daily life?",
        "What are the common features of Spreadsheet program?",
        "How is excel workbook organized?",
        "What is series? How can you create series in MS Excel?",
        "Write about different cell formatting options in MS Excel.",
        "What are the importance of chart? Write about different types of chart.",
        "What are the parts of chart? How can you create a chart? Write steps.",
        "Write about conditional formatting and formula auditing.",
        "What are advantages of sort, filter, subtotal?",
        "Write about Pivot Table.",
        "Write about validation rules available in MS Excel.",
        "Write about import and export function of MS Excel.",
        "Write about what if analysis.",
        "Write about different types of referencing method in MS Excel.",
        "Write about different types of functions available in MS-excel.",
        "Differentiate: formula and functions, relative and absolute cell reference, line chart and pie chart, auto filter and advanced filter, sort and subtotal, data table and scenario manager"
      ]
    },
    {
      id: "dbms",
      title: "🗄️ Database Management System",
      icon: <Database size={20} />,
      color: "from-pink-500 to-rose-500",
      questions: [
        "Write about advantages of DBMS.",
        "Write different elements of table.",
        "What are the relationship types available in MS Access?",
        "What is field properties? Mention about field properties available in MS Access.",
        "Define data and database with example. Write down advantages of DBMS in terms of managing database.",
        "Write about data type, field and field properties in MS access.",
        "What is query in DBMS? What are the types of queries available in MS access?",
        "Define relationship. Mention its types.",
        "Write about different types of validation in DBMS.",
        "What is index? What are its types? Write down advantages of indexing in database.",
        "What do you mean by query in MS Access? Define action query with its types.",
        "Write about any 5 data types and associated field properties in MS Access.",
        "Illustrate relation between two/three tables.",
        "Write about formatting and validating data in MS Access.",
        "How can you create form and report in Access?",
        "Write down services provided by DBMS.",
        "Differentiate: Table and queries, form and report, update query and make table query"
      ]
    },
    {
      id: "presentation",
      title: "📽️ Presentation System",
      icon: <Presentation size={20} />,
      color: "from-amber-500 to-yellow-500",
      questions: [
        "What is presentation system? Explain the usages of presentation system in government office.",
        "What do you mean by animation and transition effects in PowerPoint presentation? Write down the advantages of using those effects in the presentation slide.",
        "What is presentation system? What are the application areas of presentation system? Explain.",
        "What are the different views available in Microsoft PowerPoint? Explain.",
        "Define presentation software. Write about importance of presentation software in government organization.",
        "What are the options of formatting slides in PowerPoint?",
        "Write about different slide show options.",
        "Write advantages of master slide.",
        "Write uses of custom show.",
        "What is Microsoft PowerPoint? What are it's importance? What are its uses/application in daily life?",
        "Explain the importance of presentation application for any organization.",
        "What do you mean by presentation software? Write any 4 features of PowerPoint. What are the uses of PowerPoint in education?",
        "Differentiate: Slide Layout and Slide Design, Animation and Transition, Slide show view and slide sorter view, Slide Master and Handout Master"
      ]
    }
  ];

  const filteredTopics = topics.map(topic => ({
    ...topic,
    questions: topic.questions.filter(q => 
      q.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(topic => topic.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <BookOpen size={36} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">📖 Subjective Questions</h1>
          <p className="text-gray-500">लिखित परीक्षाका लागि महत्त्वपूर्ण प्रश्नहरू</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="🔍 प्रश्न खोज्नुहोस्..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Topics Accordion */}
        <div className="space-y-4">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
            >
              {/* Topic Header */}
              <button
                onClick={() => toggleTopic(topic.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${topic.color} flex items-center justify-center text-white shadow-md`}>
                    {topic.icon}
                  </div>
                  <h2 className="text-lg font-bold text-gray-800">{topic.title}</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                    {topic.questions.length} प्रश्नहरू
                  </span>
                </div>
                <div className="text-gray-400">
                  {openTopics[topic.id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {/* Questions List */}
              {openTopics[topic.id] && (
                <div className="border-t border-gray-100 divide-y divide-gray-50">
                  {topic.questions.map((question, idx) => (
                    <div
                      key={idx}
                      className="p-4 hover:bg-blue-50/30 transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 group-hover:text-gray-900 leading-relaxed flex-1">
                          {question}
                        </p>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(question);
                            alert("Question copied to clipboard!");
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-blue-500"
                          title="Copy to clipboard"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Print Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-md"
          >
            <Printer size={18} />
            Print All Questions
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            💡 लिखित परीक्षाको तयारीको लागि यी प्रश्नहरूको अभ्यास गर्नुहोस्
          </p>
        </div>
      </div>

      <style>{`
        @media print {
          .quiz-option, button, .container > div:first-child, .border-t, .mt-10, footer {
            display: none;
          }
          body {
            background: white;
          }
          .bg-white {
            background: white;
            border: 1px solid #ddd;
          }
          .shadow-md {
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SubjectiveQuestions;

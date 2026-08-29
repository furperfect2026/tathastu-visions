import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी (Hindi)" },
  { code: "mr", label: "मराठी (Marathi)" },
];

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Read the current language from the googtrans cookie
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      setCurrentLang(match[1]);
    } else {
      setCurrentLang("en");
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    if (langCode === "en") {
      // Clear the cookie to revert to original
      document.cookie = "googtrans=/en/en; path=/; domain=" + window.location.hostname;
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    } else {
      // Set the translation cookie
      document.cookie = `googtrans=/en/${langCode}; path=/`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
    }
    // Reload to apply translation via the Google Translate script
    window.location.reload();
  };

  return (
    <div className="notranslate">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 rounded-full border-primary/20 text-xs font-medium text-foreground hover:bg-primary/5 ">
          <Globe className="h-3.5 w-3.5" />
          {languages.find((l) => l.code === currentLang)?.label.split(" ")[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[140px] rounded-2xl p-1.5 shadow-luxe">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="cursor-pointer rounded-xl px-3 py-2 text-sm font-medium hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}

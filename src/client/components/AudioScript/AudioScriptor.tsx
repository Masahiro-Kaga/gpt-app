/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Box,
  Divider,
  IconButton,
  TextField,
  Slider,
  InputAdornment,
  Typography,
  Autocomplete,
  Input,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { useRef, useState } from "react";
import axios from "axios";
import SettingDrawer from "../common/SettingDrawer";
import { Item } from "src/client/types";
import SendIcon from "@mui/icons-material/Send";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import LanguageIcon from "@mui/icons-material/Language";

interface ImageData {
  url: string;
}

const AudioScriptor: React.FC = () => {
  const [language, setLanguage] = useState<string>("en");
  const [temperature, setTemperature] = useState<number>(0.2);
  const [script, setScript] = useState<string>("Script here");
  const [loading,setLoading] = useState<boolean>(false);

  interface LanguageOption {
    code: string;
    name: string;
  }
  const items: Item[] = [
    {
      title: "Language",
      icon: <LanguageIcon />,
      value: language,
      component: (
        <Box width="80%">
      <Autocomplete
        value={selectLanguage.find((lang) => lang.code === language)}
        onChange={(event, newValue: LanguageOption | null) => 
          setLanguage(newValue ? newValue.code : "")
        }
        getOptionLabel={(option: LanguageOption) => option.name}
        options={selectLanguage}
        filterOptions={(options, params) => {
          if (params.inputValue.length < 2) {
            return [];
          }
          return options.filter((option) =>
            option.name.toLowerCase().includes(params.inputValue.toLowerCase())
          );
        }}
        renderInput={(params) => (
          <TextField {...params} label="Choose a language" />
        )}
      />
      <Typography gutterBottom>Value: {language}</Typography>
      </Box>
        ),
    },
    {
      title: "Temperature",
      icon: <ThermostatIcon />,
      value: temperature,
      component: (
        <Box width="80%">
          <Slider
            value={temperature}
            onChange={(event, newValue) => setTemperature(newValue as number)}
            min={0.0}
            max={1.0}
            step={0.1}
            valueLabelDisplay="off"
            defaultValue={0.2}
          />{" "}
          <Typography gutterBottom>Value: {temperature}</Typography>
        </Box>
      ),
    },
  ];

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setFileName(files[0].name);
    }
  };

  const handleFileUpload = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (!file) return;

    const formData = new FormData();
    formData.append("audio", file);
    formData.append("language", language);         formData.append("temperature", temperature.toString()); 
    setLoading(true);

    try {
      const response = await axios.post("/api/audioScriptor/script", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },timeout: 10000,
      });
      setScript(response.data);
      ;
    } catch (error) {
      console.error("Axios error:", error);
      if (error) {
                        console.error("Server response error:", error);
      }
    } finally
    {
      setLoading(false);
    }
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative flex flex-col h-full items-center justify-between overflow-auto">
                  <Backdrop
      sx={{
        color: '#fff',
        flexDirection: 'column',          zIndex: (theme) => theme.zIndex.drawer + 1,
        '& .blinkingText': {
          animation: 'blinkingText 1.2s infinite',
          '@keyframes blinkingText': {
            '0%': { opacity: 0 },
            '50%': { opacity: 1 },
            '100%': { opacity: 0 },
          }
        }
      }}
        open={loading}
        onClick={() => setLoading(false)}       >
        <CircularProgress color="inherit" />
        <Typography sx={{ mt: 2 }} className="blinkingText">
        Now downloading, it may take 5 to 20 seconds.
          </Typography>
      </Backdrop>


      <div className="text-center p-10 text-2xl">Audio Scriptor</div>
      <section className="flex gap-2 justify-center w-full flex-wrap">
        <Box width={800}>
          <div>{script}</div>
        </Box>
      </section>
      <div className="w-full">
        <Divider></Divider>
        <div className="flex m-4 justify-center">
        <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept="audio/*"
            style={{display: 'none'}}
          />
          <Button variant="contained" onClick={triggerFileInputClick}>
            Choose File
          </Button>
          <Input
            type="text"
            value={file ? file.name : ''}
            readOnly
            placeholder="No file chosen"
            sx={{
              marginLeft: "20px",
              width: "500px",
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleFileUpload}
                  edge="end"
                  disabled={file === null}
                  color={file === null ? "default" : "primary"}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <div className="flex m-4 justify-center">
          <Box
            position="relative"
            border={1}
            borderColor="rgba(0,0,0,0.2)"
            mt={2}
            pt={1.5}
            pl={2}
            borderRadius="5px"
            width="800px"
            margin="auto"
          >
            <SettingDrawer items={items}>Setting</SettingDrawer>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
              {items.map((item, index) => (
                <div key={index}>
                  {item.title}: <span>{item.value}</span>
                </div>
              ))}
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AudioScriptor;

const selectLanguage = [
  { code: "aa", name: "Afar" },
  { code: "ab", name: "Abkhazian" },
  { code: "ae", name: "Avestan" },
  { code: "af", name: "Afrikaans" },
  { code: "ak", name: "Akan" },
  { code: "am", name: "Amharic" },
  { code: "an", name: "Aragonese" },
  { code: "ar", name: "Arabic" },
  { code: "as", name: "Assamese" },
  { code: "av", name: "Avaric" },
  { code: "ay", name: "Aymara" },
  { code: "az", name: "Azerbaijani" },
  { code: "ba", name: "Bashkir" },
  { code: "be", name: "Belarusian" },
  { code: "bg", name: "Bulgarian" },
  { code: "bh", name: "Bihari languages" },
  { code: "bi", name: "Bislama" },
  { code: "bm", name: "Bambara" },
  { code: "bn", name: "Bengali" },
  { code: "bo", name: "Tibetan" },
  { code: "br", name: "Breton" },
  { code: "bs", name: "Bosnian" },
  { code: "ca", name: "Catalan; Valencian" },
  { code: "ce", name: "Chechen" },
  { code: "ch", name: "Chamorro" },
  { code: "co", name: "Corsican" },
  { code: "cr", name: "Cree" },
  { code: "cs", name: "Czech" },
  {
    code: "cu",
    name: "Church Slavic; Old Slavonic; Church Slavonic; Old Bulgarian; Old Church Slavonic"
  },
  { code: "cv", name: "Chuvash" },
  { code: "cy", name: "Welsh" },
  { code: "da", name: "Danish" },
  { code: "de", name: "German" },
  { code: "dv", name: "Divehi; Dhivehi; Maldivian" },
  { code: "dz", name: "Dzongkha" },
  { code: "ee", name: "Ewe" },
  { code: "el", name: "Greek, Modern (1453-)" },
  { code: "en", name: "English" },
  { code: "eo", name: "Esperanto" },
  { code: "es", name: "Spanish; Castilian" },
  { code: "et", name: "Estonian" },
  { code: "eu", name: "Basque" },
  { code: "fa", name: "Persian" },
  { code: "ff", name: "Fulah" },
  { code: "fi", name: "Finnish" },
  { code: "fj", name: "Fijian" },
  { code: "fo", name: "Faroese" },
  { code: "fr", name: "French" },
  { code: "fy", name: "Western Frisian" },
  { code: "ga", name: "Irish" },
  { code: "gd", name: "Gaelic; Scomttish Gaelic" },
  { code: "gl", name: "Galician" },
  { code: "gn", name: "Guarani" },
  { code: "gu", name: "Gujarati" },
  { code: "gv", name: "Manx" },
  { code: "ha", name: "Hausa" },
  { code: "he", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "ho", name: "Hiri Motu" },
  { code: "hr", name: "Croatian" },
  { code: "ht", name: "Haitian; Haitian Creole" },
  { code: "hu", name: "Hungarian" },
  { code: "hy", name: "Armenian" },
  { code: "hz", name: "Herero" },
  {
    code: "ia",
    name: "Interlingua (International Auxiliary Language Association)"
  },
  { code: "id", name: "Indonesian" },
  { code: "ie", name: "Interlingue; Occidental" },
  { code: "ig", name: "Igbo" },
  { code: "ii", name: "Sichuan Yi; Nuosu" },
  { code: "ik", name: "Inupiaq" },
  { code: "io", name: "Ido" },
  { code: "is", name: "Icelandic" },
  { code: "it", name: "Italian" },
  { code: "iu", name: "Inuktitut" },
  { code: "ja", name: "Japanese" },
  { code: "jv", name: "Javanese" },
  { code: "ka", name: "Georgian" },
  { code: "kg", name: "Kongo" },
  { code: "ki", name: "Kikuyu; Gikuyu" },
  { code: "kj", name: "Kuanyama; Kwanyama" },
  { code: "kk", name: "Kazakh" },
  { code: "kl", name: "Kalaallisut; Greenlandic" },
  { code: "km", name: "Central Khmer" },
  { code: "kn", name: "Kannada" },
  { code: "ko", name: "Korean" },
  { code: "kr", name: "Kanuri" },
  { code: "ks", name: "Kashmiri" },
  { code: "ku", name: "Kurdish" },
  { code: "kv", name: "Komi" },
  { code: "kw", name: "Cornish" },
  { code: "ky", name: "Kirghiz; Kyrgyz" },
  { code: "la", name: "Latin" },
  { code: "lb", name: "Luxembourgish; Letzeburgesch" },
  { code: "lg", name: "Ganda" },
  { code: "li", name: "Limburgan; Limburger; Limburgish" },
  { code: "ln", name: "Lingala" },
  { code: "lo", name: "Lao" },
  { code: "lt", name: "Lithuanian" },
  { code: "lu", name: "Luba-Katanga" },
  { code: "lv", name: "Latvian" },
  { code: "mg", name: "Malagasy" },
  { code: "mh", name: "Marshallese" },
  { code: "mi", name: "Maori" },
  { code: "mk", name: "Macedonian" },
  { code: "ml", name: "Malayalam" },
  { code: "mn", name: "Mongolian" },
  { code: "mr", name: "Marathi" },
  { code: "ms", name: "Malay" },
  { code: "mt", name: "Maltese" },
  { code: "my", name: "Burmese" },
  { code: "na", name: "Nauru" },
  {
    code: "nb",
    name: "Bokmål, Norwegian; Norwegian Bokmål"
  },
  { code: "nd", name: "Ndebele, North; North Ndebele" },
  { code: "ne", name: "Nepali" },
  { code: "ng", name: "Ndonga" },
  { code: "nl", name: "Dutch; Flemish" },
  { code: "nn", name: "Norwegian Nynorsk; Nynorsk, Norwegian" },
  { code: "no", name: "Norwegian" },
  { code: "nr", name: "Ndebele, South; South Ndebele" },
  { code: "nv", name: "Navajo; Navaho" },
  { code: "ny", name: "Chichewa; Chewa; Nyanja" },
  { code: "oc", name: "Occitan (post 1500)" },
  { code: "oj", name: "Ojibwa" },
  { code: "om", name: "Oromo" },
  { code: "or", name: "Oriya" },
  { code: "os", name: "Ossetian; Ossetic" },
  { code: "pa", name: "Panjabi; Punjabi" },
  { code: "pi", name: "Pali" },
  { code: "pl", name: "Polish" },
  { code: "ps", name: "Pushto; Pashto" },
  { code: "pt", name: "Portuguese" },
  { code: "qu", name: "Quechua" },
  { code: "rm", name: "Romansh" },
  { code: "rn", name: "Rundi" },
  { code: "ro", name: "Romanian; Moldavian; Moldovan" },
  { code: "ru", name: "Russian" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "sa", name: "Sanskrit" },
  { code: "sc", name: "Sardinian" },
  { code: "sd", name: "Sindhi" },
  { code: "se", name: "Northern Sami" },
  { code: "sg", name: "Sango" },
  { code: "si", name: "Sinhala; Sinhalese" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "sm", name: "Samoan" },
  { code: "sn", name: "Shona" },
  { code: "so", name: "Somali" },
  { code: "sq", name: "Albanian" },
  { code: "sr", name: "Serbian" },
  { code: "ss", name: "Swati" },
  { code: "st", name: "Sotho, Southern" },
  { code: "su", name: "Sundanese" },
  { code: "sv", name: "Swedish" },
  { code: "sw", name: "Swahili" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "tg", name: "Tajik" },
  { code: "th", name: "Thai" },
  { code: "ti", name: "Tigrinya" },
  { code: "tk", name: "Turkmen" },
  { code: "tl", name: "Tagalog" },
  { code: "tn", name: "Tswana" },
  { code: "to", name: "Tonga (Tonga Islands)" },
  { code: "tr", name: "Turkish" },
  { code: "ts", name: "Tsonga" },
  { code: "tt", name: "Tatar" },
  { code: "tw", name: "Twi" },
  { code: "ty", name: "Tahitian" },
  { code: "ug", name: "Uighur; Uyghur" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "uz", name: "Uzbek" },
  { code: "ve", name: "Venda" },
  { code: "vi", name: "Vietnamese" },
  { code: "vo", name: "Volapük" },
  { code: "wa", name: "Walloon" },
  { code: "wo", name: "Wolof" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "za", name: "Zhuang; Chuang" },
  { code: "zh", name: "Chinese" },
  { code: "zu", name: "Zulu" }
]

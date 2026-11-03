import React, { useMemo, useState } from "react";
import {
  SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity,
  StyleSheet, Linking, Alert, I18nManager
} from "react-native";

const PHONE = "97455802749";
const products = [
  { id: "spc", en: "SPC Flooring", ar: "أرضيات SPC", bn: "SPC ফ্লোরিং", icon: "🪵" },
  { id: "laminate", en: "Laminate Parquet", ar: "باركيه لامينيت", bn: "ল্যামিনেট পারকেট", icon: "🏠" },
  { id: "vinyl", en: "Vinyl Flooring", ar: "أرضيات فينيل", bn: "ভিনাইল ফ্লোরিং", icon: "✨" },
  { id: "engineered", en: "Engineered Wood", ar: "خشب هندسي", bn: "ইঞ্জিনিয়ার্ড উড", icon: "🌳" },
  { id: "panels", en: "Wooden Wall Panels", ar: "ألواح جدارية خشبية", bn: "কাঠের ওয়াল প্যানেল", icon: "🪚" },
  { id: "grass", en: "Artificial Grass", ar: "عشب صناعي", bn: "কৃত্রিম ঘাস", icon: "🌿" },
];
const copy = {
  en: { tagline:"Premium Flooring & Interior Solutions", explore:"Explore our products", calc:"Room area calculator", length:"Length (metres)", width:"Width (metres)", allowance:"Extra material", calculate:"Calculate area", quote:"Get a Quote", name:"Your name", mobile:"Mobile / WhatsApp", location:"Project location", notes:"Project details", send:"Send quote request on WhatsApp", contact:"Contact us", projects:"Our services", area:"Room area", required:"Estimated material incl. allowance", choose:"Choose a product", selected:"Selected product" },
  ar: { tagline:"حلول الأرضيات والديكور الداخلي المتميزة", explore:"استكشف منتجاتنا", calc:"حاسبة مساحة الغرفة", length:"الطول (متر)", width:"العرض (متر)", allowance:"مواد إضافية", calculate:"احسب المساحة", quote:"اطلب عرض سعر", name:"الاسم", mobile:"الهاتف / واتساب", location:"موقع المشروع", notes:"تفاصيل المشروع", send:"إرسال طلب عرض السعر عبر واتساب", contact:"اتصل بنا", projects:"خدماتنا", area:"مساحة الغرفة", required:"المواد التقديرية مع الإضافة", choose:"اختر المنتج", selected:"المنتج المختار" },
  bn: { tagline:"প্রিমিয়াম ফ্লোরিং ও ইন্টেরিয়র সল্যুশন", explore:"আমাদের পণ্য দেখুন", calc:"রুমের মাপ হিসাব", length:"দৈর্ঘ্য (মিটার)", width:"প্রস্থ (মিটার)", allowance:"অতিরিক্ত উপকরণ", calculate:"হিসাব করুন", quote:"কোটেশন নিন", name:"আপনার নাম", mobile:"মোবাইল / WhatsApp", location:"প্রজেক্টের স্থান", notes:"কাজের বিবরণ", send:"WhatsApp-এ কোটেশন অনুরোধ পাঠান", contact:"যোগাযোগ", projects:"আমাদের সেবা", area:"রুমের আয়তন", required:"অতিরিক্তসহ আনুমানিক উপকরণ", choose:"পণ্য নির্বাচন করুন", selected:"নির্বাচিত পণ্য" }
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [product, setProduct] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [extra, setExtra] = useState("10");
  const [result, setResult] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const t = copy[lang];
  const rtl = lang === "ar";
  const selected = products.find(p => p.id === product);
  const area = useMemo(() => result, [result]);

  function calculate() {
    const l = Number(length), w = Number(width);
    if (!(l > 0 && w > 0)) {
      Alert.alert("Check dimensions", "Please enter a valid length and width.");
      return;
    }
    const base = l * w;
    setResult({ base, total: base * (1 + Number(extra) / 100) });
  }

  function sendQuote() {
    if (!name.trim() || !mobile.trim() || !product) {
      Alert.alert("Missing details", "Please enter your name, mobile number and select a product.");
      return;
    }
    const message = [
      "FLOORING PRO QATAR - QUOTATION REQUEST",
      `Name: ${name}`, `Customer mobile: ${mobile}`,
      `Product: ${selected?.en || product}`,
      `Project location: ${location || "Not provided"}`,
      result ? `Room area: ${result.base.toFixed(2)} m²; estimated material with ${extra}% allowance: ${result.total.toFixed(2)} m²` : "Room measurements: Not provided",
      `Project details: ${notes || "Not provided"}`
    ].join("\n");
    Linking.openURL(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`);
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container}>
        <View style={s.hero}>
          <Text style={s.brand}>FLOORING PRO</Text>
          <Text style={s.qatar}>QATAR</Text>
          <Text style={s.tagline}>{t.tagline}</Text>
          <View style={s.langs}>
            {["en","ar","bn"].map(x => <TouchableOpacity key={x} onPress={() => setLang(x)} style={[s.lang, lang===x && s.langActive]}><Text style={[s.langText,lang===x&&s.langTextActive]}>{x==="bn"?"বাংলা":x.toUpperCase()}</Text></TouchableOpacity>)}
          </View>
        </View>

        <Text style={s.heading}>{t.explore}</Text>
        <View style={s.grid}>
          {products.map(p => <TouchableOpacity key={p.id} onPress={() => setProduct(p.id)} style={[s.product, product===p.id && s.productSelected]}>
            <Text style={s.emoji}>{p.icon}</Text>
            <Text style={s.productName}>{p[lang]}</Text>
            {product===p.id && <Text style={s.tick}>✓</Text>}
          </TouchableOpacity>)}
        </View>

        <View style={s.card}>
          <Text style={s.heading}>{t.calc}</Text>
          <Text style={s.label}>{t.length}</Text>
          <TextInput value={length} onChangeText={setLength} keyboardType="decimal-pad" placeholder="e.g. 5" style={s.input}/>
          <Text style={s.label}>{t.width}</Text>
          <TextInput value={width} onChangeText={setWidth} keyboardType="decimal-pad" placeholder="e.g. 4" style={s.input}/>
          <Text style={s.label}>{t.allowance}</Text>
          <View style={s.chips}>{["5","10","15"].map(v=><TouchableOpacity key={v} onPress={()=>setExtra(v)} style={[s.chip,extra===v&&s.chipActive]}><Text style={[s.chipText,extra===v&&s.chipTextActive]}>{v}%</Text></TouchableOpacity>)}</View>
          <TouchableOpacity style={s.primary} onPress={calculate}><Text style={s.primaryText}>{t.calculate}</Text></TouchableOpacity>
          {area && <View style={s.result}><Text>{t.area}: {area.base.toFixed(2)} m²</Text><Text style={s.resultStrong}>{t.required}: {area.total.toFixed(2)} m²</Text></View>}
        </View>

        <View style={s.card}>
          <Text style={s.heading}>{t.quote}</Text>
          <Text style={s.label}>{t.choose}</Text>
          <Text style={s.selected}>{selected ? `${t.selected}: ${selected[lang]}` : "Select a product above"}</Text>
          <TextInput value={name} onChangeText={setName} placeholder={t.name} style={s.input}/>
          <TextInput value={mobile} onChangeText={setMobile} placeholder={t.mobile} keyboardType="phone-pad" style={s.input}/>
          <TextInput value={location} onChangeText={setLocation} placeholder={t.location} style={s.input}/>
          <TextInput value={notes} onChangeText={setNotes} placeholder={t.notes} multiline style={[s.input,s.multiline]}/>
          <TouchableOpacity style={s.primary} onPress={sendQuote}><Text style={s.primaryText}>{t.send}</Text></TouchableOpacity>
        </View>
        <View style={s.footer}>
          <Text style={s.heading}>{t.contact}</Text>
          <Text style={s.phone}>WhatsApp: +974 55802749</Text>
          <Text style={s.muted}>FLOORING PRO QATAR</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
 safe:{flex:1,backgroundColor:"#f4f3ef"},container:{padding:16,paddingBottom:32,gap:16},
 hero:{backgroundColor:"#253b32",borderRadius:20,padding:22,alignItems:"center"},
 brand:{fontSize:27,fontWeight:"900",letterSpacing:2,color:"#fff"},qatar:{fontSize:19,fontWeight:"800",letterSpacing:6,color:"#d8bc83",marginTop:2},
 tagline:{color:"#fff",opacity:.85,marginTop:8,textAlign:"center"},langs:{flexDirection:"row",gap:8,marginTop:18},
 lang:{paddingVertical:8,paddingHorizontal:14,borderRadius:20,borderWidth:1,borderColor:"#b8c3bc"},langActive:{backgroundColor:"#d8bc83",borderColor:"#d8bc83"},langText:{color:"#fff",fontWeight:"700"},langTextActive:{color:"#253b32"},
 heading:{fontSize:19,fontWeight:"800",color:"#24372f",marginBottom:8},grid:{flexDirection:"row",flexWrap:"wrap",gap:10},
 product:{width:"48%",minHeight:105,backgroundColor:"#fff",borderRadius:14,padding:14,borderWidth:1,borderColor:"#e2e1dc",justifyContent:"center"},
 productSelected:{borderColor:"#b18b4d",borderWidth:2},emoji:{fontSize:25,marginBottom:7},productName:{fontWeight:"700",color:"#26372f"},tick:{position:"absolute",right:10,top:8,color:"#99733c",fontWeight:"900"},
 card:{backgroundColor:"#fff",borderRadius:18,padding:16,borderWidth:1,borderColor:"#e6e3dc"},
 label:{fontSize:13,fontWeight:"700",color:"#4d5a52",marginTop:9,marginBottom:5},input:{borderWidth:1,borderColor:"#deded8",borderRadius:10,padding:12,color:"#1e2d25",backgroundColor:"#fff"},
 multiline:{minHeight:85,textAlignVertical:"top"},chips:{flexDirection:"row",gap:8,marginVertical:8},chip:{padding:10,borderRadius:10,borderWidth:1,borderColor:"#d8d8d0"},chipActive:{backgroundColor:"#253b32",borderColor:"#253b32"},chipText:{color:"#253b32"},chipTextActive:{color:"#fff"},
 primary:{backgroundColor:"#253b32",borderRadius:12,padding:15,alignItems:"center",marginTop:12},primaryText:{color:"#fff",fontWeight:"800",textAlign:"center"},
 result:{backgroundColor:"#edf2ed",padding:13,borderRadius:10,marginTop:12,gap:5},resultStrong:{fontWeight:"900",color:"#253b32"},selected:{color:"#8b6a37",fontWeight:"700",marginBottom:8},
 footer:{alignItems:"center",padding:12},phone:{fontWeight:"800",fontSize:17,color:"#253b32"},muted:{color:"#68756d",fontSize:11,marginTop:5}
});

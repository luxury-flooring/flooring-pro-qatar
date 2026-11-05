import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const PHONE = "97455802749";

const products = [
  {
    id: "spc",
    en: "SPC Flooring",
    ar: "أرضيات SPC",
    bn: "SPC ফ্লোরিং",
    icon: "▦",
  },
  {
    id: "laminate",
    en: "Laminate Parquet",
    ar: "باركيه لامينيت",
    bn: "ল্যামিনেট পারকেট",
    icon: "▥",
  },
  {
    id: "vinyl",
    en: "Vinyl Flooring",
    ar: "أرضيات فينيل",
    bn: "ভিনাইল ফ্লোরিং",
    icon: "▤",
  },
  {
    id: "engineered",
    en: "Engineered Wood",
    ar: "خشب هندسي",
    bn: "ইঞ্জিনিয়ার্ড উড",
    icon: "▧",
  },
  {
    id: "panels",
    en: "Wooden Wall Panels",
    ar: "ألواح جدارية خشبية",
    bn: "কাঠের ওয়াল প্যানেল",
    icon: "▥",
  },
  {
    id: "grass",
    en: "Artificial Grass",
    ar: "عشب صناعي",
    bn: "কৃত্রিম ঘাস",
    icon: "❋",
  },
];

const text = {
  en: {
    brand: "FLOORING PRO QATAR",
    hero: "Transform Your Space",
    subtitle: "Premium flooring solutions for homes, offices and commercial spaces.",
    products: "Our Products",
    calculator: "Area Calculator",
    length: "Length (m)",
    width: "Width (m)",
    allowance: "Extra allowance",
    area: "Required Area",
    quote: "Request a Quote",
    name: "Your Name",
    mobile: "Mobile Number",
    location: "Location",
    notes: "Additional requirements",
    whatsapp: "Send via WhatsApp",
    noPrice: "Price on request",
    choose: "Select Product",
    footer: "Quality Flooring • Professional Service • Qatar",
  },
  ar: {
    brand: "FLOORING PRO QATAR",
    hero: "غيّر مساحة منزلك",
    subtitle: "حلول أرضيات متميزة للمنازل والمكاتب والمساحات التجارية.",
    products: "منتجاتنا",
    calculator: "حاسبة المساحة",
    length: "الطول (م)",
    width: "العرض (م)",
    allowance: "هامش إضافي",
    area: "المساحة المطلوبة",
    quote: "طلب عرض سعر",
    name: "الاسم",
    mobile: "رقم الجوال",
    location: "الموقع",
    notes: "متطلبات إضافية",
    whatsapp: "إرسال عبر واتساب",
    noPrice: "السعر عند الطلب",
    choose: "اختر المنتج",
    footer: "جودة عالية • خدمة احترافية • قطر",
  },
  bn: {
    brand: "FLOORING PRO QATAR",
    hero: "আপনার জায়গাকে নতুন রূপ দিন",
    subtitle: "বাড়ি, অফিস ও কমার্শিয়াল স্পেসের জন্য প্রিমিয়াম ফ্লোরিং সমাধান।",
    products: "আমাদের পণ্য",
    calculator: "এরিয়া ক্যালকুলেটর",
    length: "দৈর্ঘ্য (মিটার)",
    width: "প্রস্থ (মিটার)",
    allowance: "অতিরিক্ত হিসাব",
    area: "প্রয়োজনীয় এলাকা",
    quote: "কোটেশন অনুরোধ করুন",
    name: "আপনার নাম",
    mobile: "মোবাইল নম্বর",
    location: "লোকেশন",
    notes: "অতিরিক্ত প্রয়োজন",
    whatsapp: "WhatsApp-এ পাঠান",
    noPrice: "মূল্য জানতে যোগাযোগ করুন",
    choose: "পণ্য নির্বাচন করুন",
    footer: "মানসম্মত ফ্লোরিং • পেশাদার সেবা • কাতার",
  },
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [allowance, setAllowance] = useState("10");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const t = text[lang];
  const isRTL = lang === "ar";

  const baseArea =
    parseFloat(length || 0) * parseFloat(width || 0);

  const finalArea =
    baseArea > 0
      ? (baseArea * (1 + parseFloat(allowance || 0) / 100)).toFixed(2)
      : "0.00";

  const productName =
    products.find((p) => p.id === selectedProduct)?.[lang] ||
    selectedProduct ||
    "";

  const sendWhatsApp = () => {
    if (!name || !mobile || !location) {
      Alert.alert(
        lang === "bn" ? "তথ্য প্রয়োজন" : lang === "ar" ? "معلومات مطلوبة" : "Information Required",
        lang === "bn"
          ? "নাম, মোবাইল ও লোকেশন পূরণ করুন।"
          : lang === "ar"
          ? "يرجى إدخال الاسم ورقم الجوال والموقع."
          : "Please enter your name, mobile number and location."
      );
      return;
    }

    const message =
      `Hello Flooring Pro Qatar,\n\n` +
      `Quote Request\n` +
      `Name: ${name}\n` +
      `Mobile: ${mobile}\n` +
      `Location: ${location}\n` +
      `Product: ${productName || "Not selected"}\n` +
      `Area: ${finalArea} m²\n` +
      `Notes: ${notes || "N/A"}\n\n` +
      `Thank you.`;

    const url = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert(
        "WhatsApp",
        "WhatsApp could not be opened on this device."
      );
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>{t.brand}</Text>
            <Text style={styles.smallText}>Premium Flooring Solutions</Text>
          </View>

          <View style={styles.langRow}>
            {["en", "ar", "bn"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.langButton,
                  lang === item && styles.langActive,
                ]}
                onPress={() => setLang(item)}
              >
                <Text
                  style={[
                    styles.langText,
                    lang === item && styles.langTextActive,
                  ]}
                >
                  {item === "en" ? "EN" : item === "ar" ? "AR" : "বাং"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <Text style={[styles.heroTitle, isRTL && styles.rtl]}>
            {t.hero}
          </Text>

          <Text style={[styles.heroSubtitle, isRTL && styles.rtl]}>
            {t.subtitle}
          </Text>

          <View style={styles.heroLine} />

          <Text style={styles.heroPhone}>WhatsApp: +974 5580 2749</Text>
        </View>

        {/* PRODUCTS */}
        <Text style={[styles.sectionTitle, isRTL && styles.rtl]}>
          {t.products}
        </Text>

        <View style={styles.grid}>
          {products.map((item) => {
            const active = selectedProduct === item.id;

            return (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.productCard,
                  active && styles.productActive,
                ]}
                onPress={() => setSelectedProduct(item.id)}
              >
                <View style={styles.iconBox}>
                  <Text style={styles.icon}>{item.icon}</Text>
                </View>

                <Text style={[styles.productName, isRTL && styles.rtl]}>
                  {item[lang]}
                </Text>

                <Text style={styles.request}>{t.noPrice}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* CALCULATOR */}
        <View style={styles.card}>
          <Text style={[styles.cardTitle, isRTL && styles.rtl]}>
            {t.calculator}
          </Text>

          <TextInput
            style={[styles.input, isRTL && styles.rtlInput]}
            placeholder={t.length}
            placeholderTextColor="#8c8c8c"
            keyboardType="decimal-pad"
            value={length}
            onChangeText={setLength}
          />

          <TextInput
            style={[styles.input, isRTL && styles.rtlInput]}
            placeholder={t.width}
            placeholderTextColor="#8c8c8c"
            keyboardType="decimal-pad"
            value={width}
            onChangeText={setWidth}
          />

          <Text style={[styles.allowanceLabel, isRTL && styles.rtl]}>
            {t.allowance}
          </Text>

          <View style={styles.allowanceRow}>
            {["5", "10", "15"].map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.allowanceButton,
                  allowance === value && styles.allowanceActive,
                ]}
                onPress={() => setAllowance(value)}
              >
                <Text
                  style={[
                    styles.allowanceText,
                    allowance === value && styles.allowanceTextActive,
                  ]}
                >
                  {value}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.resultBox}>
            <Text style={styles.resultLabel}>{t.area}</Text>
            <Text style={styles.resultValue}>{finalArea} m²</Text>
          </View>
        </View>

        {/* QUOTE */}
        <View style={styles.card}>
          <Text style={[styles.cardTitle, isRTL && styles.rtl]}>
            {t.quote}
          </Text>

          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => {
              if (!selectedProduct) {
                Alert.alert(t.choose);
              }
            }}
          >
            <Text style={styles.selectText}>
              {productName || t.choose}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder={t.name}
            placeholderTextColor="#8c8c8c"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder={t.mobile}
            placeholderTextColor="#8c8c8c"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />

          <TextInput
            style={styles.input}
            placeholder={t.location}
            placeholderTextColor="#8c8c8c"
            value={location}
            onChangeText={setLocation}
          />

          <TextInput
            style={[styles.input, styles.notes]}
            placeholder={t.notes}
            placeholderTextColor="#8c8c8c"
            multiline
            value={notes}
            onChangeText={setNotes}
          />

          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={sendWhatsApp}
          >
            <Text style={styles.whatsappText}>
              {t.whatsapp}
            </Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>
            FLOORING PRO QATAR
          </Text>

          <Text style={styles.footerText}>
            {t.footer}
          </Text>

          <Text style={styles.footerPhone}>
            +974 5580 2749
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#07110d",
  },

  container: {
    backgroundColor: "#f5f2ea",
    paddingBottom: 40,
  },

  header: {
    backgroundColor: "#07110d",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: "#d9b76b",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 1,
  },

  smallText: {
    color: "#a9aaa3",
    fontSize: 10,
    marginTop: 3,
  },

  langRow: {
    flexDirection: "row",
    gap: 5,
  },

  langButton: {
    borderWidth: 1,
    borderColor: "#59645e",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  langActive: {
    backgroundColor: "#d9b76b",
    borderColor: "#d9b76b",
  },

  langText: {
    color: "#d4d7d3",
    fontSize: 10,
    fontWeight: "700",
  },

  langTextActive: {
    color: "#07110d",
  },

  hero: {
    backgroundColor: "#0b1d15",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 42,
    alignItems: "center",
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 31,
    fontWeight: "900",
    textAlign: "center",
  },

  heroSubtitle: {
    color: "#c7ccc7",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 12,
    maxWidth: 330,
  },

  heroLine: {
    width: 55,
    height: 3,
    backgroundColor: "#d9b76b",
    marginVertical: 20,
  },

  heroPhone: {
    color: "#d9b76b",
    fontSize: 13,
    fontWeight: "700",
  },

  sectionTitle: {
    color: "#0b1d15",
    fontSize: 22,
    fontWeight: "900",
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },

  grid: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  productCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e3dfd5",
  },

  productActive: {
    borderColor: "#d9b76b",
    borderWidth: 2,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#0b1d15",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  icon: {
    color: "#d9b76b",
    fontSize: 23,
    fontWeight: "900",
  },

  productName: {
    color: "#17231d",
    fontSize: 15,
    fontWeight: "800",
    minHeight: 38,
  },

  request: {
    color: "#8b8b84",
    fontSize: 10,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 18,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e4dfd4",
  },

  cardTitle: {
    color: "#0b1d15",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#f6f5f1",
    borderWidth: 1,
    borderColor: "#e0ddd4",
    borderRadius: 11,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#17231d",
    marginBottom: 11,
  },

  rtlInput: {
    textAlign: "right",
  },

  allowanceLabel: {
    color: "#525850",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },

  allowanceRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 15,
  },

  allowanceButton: {
    borderWidth: 1,
    borderColor: "#d8d4ca",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },

  allowanceActive: {
    backgroundColor: "#0b1d15",
    borderColor: "#0b1d15",
  },

  allowanceText: {
    color: "#3d433f",
    fontWeight: "700",
  },

  allowanceTextActive: {
    color: "#d9b76b",
  },

  resultBox: {
    backgroundColor: "#0b1d15",
    borderRadius: 13,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  resultLabel: {
    color: "#b9c0ba",
    fontSize: 12,
  },

  resultValue: {
    color: "#d9b76b",
    fontSize: 22,
    fontWeight: "900",
  },

  selectButton: {
    backgroundColor: "#f6f5f1",
    borderWidth: 1,
    borderColor: "#d8d4ca",
    borderRadius: 11,
    padding: 13,
    marginBottom: 11,
  },

  selectText: {
    color: "#4b514c",
    fontSize: 14,
  },

  notes: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  whatsappButton: {
    backgroundColor: "#0b1d15",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 3,
  },

  whatsappText: {
    color: "#d9b76b",
    fontSize: 15,
    fontWeight: "900",
  },

  footer: {
    backgroundColor: "#07110d",
    marginTop: 30,
    paddingVertical: 28,
    alignItems: "center",
  },

  footerBrand: {
    color: "#d9b76b",
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 1,
  },

  footerText: {
    color: "#9da49e",
    fontSize: 11,
    marginTop: 8,
    textAlign: "center",
  },

  footerPhone: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 10,
  },

  rtl: {
    textAlign: "right",
  },
});

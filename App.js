import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert
} from "react-native";
import { StatusBar } from "expo-status-bar";

const PHONE = "97455802749";

const catalog = [
  { id: "spc01", image: require("./assets/assets/assets/spc_01.jpg") },
  { id: "spc02", image: require("./assets/assets/assets/spc_02.jpg") },
  { id: "spc03", image: require("./assets/assets/assets/spc_03.jpg") },
  { id: "spc04", image: require("./assets/assets/assets/spc_04.jpg") },
  { id: "spc05", image: require("./assets/assets/assets/spc_05.jpg") },
  { id: "spc06", image: require("./assets/assets/assets/spc_06.jpg") },
  { id: "spc07", image: require("./assets/assets/assets/spc_07.jpg") },
  { id: "spc08", image: require("./assets/assets/assets/spc_08.jpg") },
];

const categories = [
  ["SPC Flooring", "أرضيات SPC", "SPC ফ্লোরিং"],
  ["Laminate Parquet", "باركيه لامينيت", "ল্যামিনেট পারকেট"],
  ["Vinyl Flooring", "أرضيات فينيل", "ভিনাইল ফ্লোরিং"],
  ["Engineered Wood", "خشب هندسي", "ইঞ্জিনিয়ার্ড উড"],
  ["Wooden Wall Panels", "ألواح جدارية خشبية", "কাঠের ওয়াল প্যানেল"],
  ["Artificial Grass", "عشب صناعي", "কৃত্রিম ঘাস"],
];

const T = {
  en: {
    hero: "Transform Your Space",
    sub: "Premium flooring solutions for homes, offices and commercial spaces.",
    catalog: "SPC Flooring Catalog",
    quote: "Request a Quote",
    name: "Your Name",
    mobile: "Mobile Number",
    location: "Location",
    notes: "Additional requirements",
    send: "Send via WhatsApp",
    calc: "Area Calculator",
    length: "Length (m)",
    width: "Width (m)",
    area: "Required Area",
    allowance: "Extra allowance",
    selected: "Selected product",
  },
  ar: {
    hero: "غيّر مساحة منزلك",
    sub: "حلول أرضيات متميزة للمنازل والمكاتب والمساحات التجارية.",
    catalog: "كتالوج أرضيات SPC",
    quote: "طلب عرض سعر",
    name: "الاسم",
    mobile: "رقم الجوال",
    location: "الموقع",
    notes: "متطلبات إضافية",
    send: "إرسال عبر واتساب",
    calc: "حاسبة المساحة",
    length: "الطول (م)",
    width: "العرض (م)",
    area: "المساحة المطلوبة",
    allowance: "هامش إضافي",
    selected: "المنتج المختار",
  },
  bn: {
    hero: "আপনার জায়গাকে নতুন রূপ দিন",
    sub: "বাড়ি, অফিস ও কমার্শিয়াল স্পেসের জন্য প্রিমিয়াম ফ্লোরিং সমাধান।",
    catalog: "SPC ফ্লোরিং ক্যাটালগ",
    quote: "কোটেশন অনুরোধ করুন",
    name: "আপনার নাম",
    mobile: "মোবাইল নম্বর",
    location: "লোকেশন",
    notes: "অতিরিক্ত প্রয়োজন",
    send: "WhatsApp-এ পাঠান",
    calc: "এরিয়া ক্যালকুলেটর",
    length: "দৈর্ঘ্য (মিটার)",
    width: "প্রস্থ (মিটার)",
    area: "প্রয়োজনীয় এলাকা",
    allowance: "অতিরিক্ত হিসাব",
    selected: "নির্বাচিত পণ্য",
  },
};

export default function App() {
  const [lang, setLang] = useState("en");
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [allowance, setAllowance] = useState("10");

  const t = T[lang];

  const area = (
    parseFloat(length || 0) *
    parseFloat(width || 0) *
    (1 + parseFloat(allowance || 0) / 100)
  ).toFixed(2);

  function sendWhatsApp() {
    if (!name || !mobile || !location) {
      Alert.alert(
        "Required",
        "Please enter your name, mobile and location."
      );
      return;
    }

    const msg = `Hello Flooring Pro Qatar

Quote Request
Name: ${name}
Mobile: ${mobile}
Location: ${location}
Product: ${
      selected ? "SPC Catalog - " + selected : "SPC Flooring"
    }
Area: ${area} m²
Notes: ${notes || "N/A"}`;

    Linking.openURL(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      <ScrollView
        contentContainerStyle={styles.page}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>FLOORING PRO QATAR</Text>
            <Text style={styles.tag}>
              Premium Flooring Solutions
            </Text>
          </View>

          <View style={styles.langs}>
            {["en", "ar", "bn"].map((x) => (
              <TouchableOpacity
                key={x}
                onPress={() => setLang(x)}
                style={[
                  styles.lang,
                  lang === x && styles.langOn,
                ]}
              >
                <Text
                  style={[
                    styles.langText,
                    lang === x && styles.langTextOn,
                  ]}
                >
                  {x === "en"
                    ? "EN"
                    : x === "ar"
                    ? "AR"
                    : "বাং"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* HERO */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>{t.hero}</Text>

          <Text style={styles.heroSub}>
            {t.sub}
          </Text>

          <Text style={styles.whats}>
            WhatsApp +974 5580 2749
          </Text>
        </View>

        {/* SPC CATALOG */}
        <Text style={styles.section}>
          {t.catalog}
        </Text>

        <View style={styles.grid}>
          {catalog.map((p) => (
            <TouchableOpacity
              key={p.id}
              onPress={() => setSelected(p.id)}
              style={[
                styles.product,
                selected === p.id && styles.productOn,
              ]}
            >
              <Image
                source={p.image}
                style={styles.productImage}
              />

              <View style={styles.productFooter}>
                <Text style={styles.productName}>
                  SPC Flooring
                </Text>

                <Text style={styles.view}>
                  Request quote
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* CATEGORIES */}
        <Text style={styles.section}>
          Categories
        </Text>

        <View style={styles.catGrid}>
          {categories.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={styles.cat}
              onPress={() =>
                i === 0
                  ? setSelected("SPC Flooring")
                  : null
              }
            >
              <Text style={styles.catIcon}>
                {["▦", "▥", "▤", "▧", "▥", "❋"][i]}
              </Text>

              <Text style={styles.catText}>
                {c[lang]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* AREA CALCULATOR */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t.calc}
          </Text>

          <TextInput
            style={styles.input}
            placeholder={t.length}
            placeholderTextColor="#8b8b84"
            keyboardType="decimal-pad"
            value={length}
            onChangeText={setLength}
          />

          <TextInput
            style={styles.input}
            placeholder={t.width}
            placeholderTextColor="#8b8b84"
            keyboardType="decimal-pad"
            value={width}
            onChangeText={setWidth}
          />

          <Text style={styles.smallLabel}>
            {t.allowance}
          </Text>

          <View style={styles.row}>
            {["5", "10", "15"].map((v) => (
              <TouchableOpacity
                key={v}
                onPress={() => setAllowance(v)}
                style={[
                  styles.allow,
                  allowance === v && styles.allowOn,
                ]}
              >
                <Text
                  style={[
                    styles.allowText,
                    allowance === v &&
                      styles.allowTextOn,
                  ]}
                >
                  {v}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.result}>
            <Text style={styles.resultLabel}>
              {t.area}
            </Text>

            <Text style={styles.resultValue}>
              {area} m²
            </Text>
          </View>
        </View>

        {/* QUOTE FORM */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t.quote}
          </Text>

          <TextInput
            style={styles.input}
            placeholder={t.name}
            placeholderTextColor="#8b8b84"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder={t.mobile}
            placeholderTextColor="#8b8b84"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />

          <TextInput
            style={styles.input}
            placeholder={t.location}
            placeholderTextColor="#8b8b84"
            value={location}
            onChangeText={setLocation}
          />

          <TextInput
            style={[
              styles.input,
              styles.notes,
            ]}
            placeholder={t.notes}
            placeholderTextColor="#8b8b84"
            multiline
            value={notes}
            onChangeText={setNotes}
          />

          <TouchableOpacity
            style={styles.waButton}
            onPress={sendWhatsApp}
          >
            <Text style={styles.waText}>
              ● {t.send}
            </Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>
            FLOORING PRO QATAR
          </Text>

          <Text style={styles.footerText}>
            Quality Flooring • Professional Service • Qatar
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

  page: {
    backgroundColor: "#f5f2ea",
    paddingBottom: 30,
  },

  header: {
    backgroundColor: "#07110d",
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    color: "#d9b76b",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.7,
  },

  tag: {
    color: "#aeb5ae",
    fontSize: 9,
    marginTop: 3,
  },

  langs: {
    flexDirection: "row",
    gap: 5,
  },

  lang: {
    borderWidth: 1,
    borderColor: "#59645e",
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },

  langOn: {
    backgroundColor: "#d9b76b",
    borderColor: "#d9b76b",
  },

  langText: {
    color: "#ddd",
    fontSize: 9,
    fontWeight: "800",
  },

  langTextOn: {
    color: "#07110d",
  },

  hero: {
    backgroundColor: "#0b1d15",
    paddingHorizontal: 20,
    paddingTop: 34,
    paddingBottom: 30,
    alignItems: "center",
  },

  heroTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },

  heroSub: {
    color: "#c5ccc6",
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 340,
  },

  whats: {
    color: "#d9b76b",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 15,
  },

  section: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0b1d15",
    marginHorizontal: 17,
    marginTop: 22,
    marginBottom: 12,
  },

  grid: {
    paddingHorizontal: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  product: {
    width: "48.2%",
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0dbd0",
    marginBottom: 12,
  },

  productOn: {
    borderColor: "#d9b76b",
    borderWidth: 2,
  },

  productImage: {
    width: "100%",
    height: 145,
    resizeMode: "cover",
  },

  productFooter: {
    padding: 9,
  },

  productName: {
    color: "#17231d",
    fontSize: 13,
    fontWeight: "900",
  },

  view: {
    color: "#8b8b84",
    fontSize: 9,
    marginTop: 3,
  },

  catGrid: {
    paddingHorizontal: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cat: {
    width: "31.5%",
    backgroundColor: "#fff",
    borderRadius: 13,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e3dfd5",
  },

  catIcon: {
    fontSize: 22,
    color: "#0b1d15",
  },

  catText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#26322b",
    textAlign: "center",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginTop: 14,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2ddd3",
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: "#0b1d15",
    marginBottom: 13,
  },

  input: {
    backgroundColor: "#f6f5f1",
    borderWidth: 1,
    borderColor: "#dfdbd2",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 13,
    color: "#17231d",
    marginBottom: 10,
  },

  notes: {
    minHeight: 78,
    textAlignVertical: "top",
  },

  smallLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#555b56",
    marginBottom: 7,
  },

  row: {
    flexDirection: "row",
    gap: 7,
    marginBottom: 13,
  },

  allow: {
    borderWidth: 1,
    borderColor: "#d8d4ca",
    borderRadius: 9,
    paddingHorizontal: 17,
    paddingVertical: 8,
  },

  allowOn: {
    backgroundColor: "#0b1d15",
    borderColor: "#0b1d15",
  },

  allowText: {
    fontWeight: "800",
    color: "#444a45",
  },

  allowTextOn: {
    color: "#d9b76b",
  },

  result: {
    backgroundColor: "#0b1d15",
    borderRadius: 11,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  resultLabel: {
    color: "#b9c0ba",
    fontSize: 11,
  },

  resultValue: {
    color: "#d9b76b",
    fontSize: 20,
    fontWeight: "900",
  },

  waButton: {
    backgroundColor: "#0b1d15",
    borderRadius: 11,
    paddingVertical: 14,
    alignItems: "center",
  },

  waText: {
    color: "#d9b76b",
    fontWeight: "900",
    fontSize: 14,
  },

  footer: {
    backgroundColor: "#07110d",
    marginTop: 25,
    paddingVertical: 25,
    alignItems: "center",
  },

  footerBrand: {
    color: "#d9b76b",
    fontWeight: "900",
    fontSize: 14,
  },

  footerText: {
    color: "#9ba29c",
    fontSize: 10,
    marginTop: 6,
  },

  footerPhone: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 8,
  },
});

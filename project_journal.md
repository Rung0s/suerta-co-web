# Suerta Co. Web Geliştirme Günlüğü (Project Journal)

Bu belge, Suerta Co. için "Site of the Year" standartlarında, premium ve interaktif bir web sitesi geliştirilirken yaşanan tüm süreci, yapılan hataları, çıkarılan dersleri ve uygulanan çözümleri belgelemektedir.

## 1. Geliştirme Sürecindeki Temel Hatalarımız ve Takıldığımız Noktalar

### 1.1. React Three Fiber (3D Küre) ve Scroll Çakışması
**Ne Yaptık:** Hero bölümündeki 3D siyah küreyi fareyle tutup çevirebilmek için `@react-three/drei` kütüphanesinden `PresentationControls` bileşenini kullandık.
**Nerede Takıldık:** Bu bileşen, sitemizdeki özel imleç (Custom Cursor) ve sayfanın aşağı kaydırılma (Scroll) mekanizmalarıyla çakıştı. Bu çakışma React'in render döngüsünü dondurdu (freeze). Site kilitlendiği için sonradan yaptığımız hiçbir stil veya metin değişikliği ekrana yansımadı.
**Nasıl Çözdük:** `PresentationControls`'ü tamamen sildik. Bunun yerine, fare hareketlerini (`mousemove` event) dinleyerek küreyi çok hafif ve pürüzsüz bir şekilde eğen/döndüren özel bir *Parallax* efekti (`useFrame` ile) yazdık. Hem donma sorunu çözüldü hem de çok daha "premium" bir hissiyat elde edildi.

### 1.2. Açılış Ekranı (Preloader) Logosu Optik Kayma Hatası
**Ne Yaptık:** Logonun sayfada tam ortalı olmadığını fark ettik ve CSS üzerinden `transform: translateX(-20px)` vererek sola kaydırmaya çalıştık.
**Nerede Takıldık:** 
1. **Animasyon Ezilmesi:** Sola kaydırmak için yazdığımız inline CSS kodu işe yaramadı çünkü logonun ekranda belirmesini sağlayan `logoReveal` CSS Keyframe animasyonu, %100 noktasına ulaştığında `transform: scale(1)` değerini zorunlu kılıyor ve bizim yazdığımız `translateX` değerini ezip siliyordu.
2. **Wrapper Taşması:** Logoyu saran div'in (`logoWrapper`) genişliği 120px'ti ama logomuz 140px'ti. Flexbox 120px'i ortaladığında, içindeki 140px'lik logo sağa doğru 20px taşıyor ve tüm logonun merkezini 10px sağa kaydırıyordu.
3. **Geometrik vs Optik Merkez:** "SUERTA CO." yazısı geometrik olarak kusursuz ortalanmış olsa da; "SUERTA" kelimesi geniş ve ağır, " CO." kısmı ise boşluk ve ince bir noktadan ibaret olduğu için görsel ağırlık (optik merkez) sol tarafta toplanıyordu. Bu da kürenin (arkaplan) yazının solunda kaldığı illüzyonunu yaratıyordu.
**Nasıl Çözdük:** Logonun o şık 3D yörüngeli orijinal tasarımına (eski haline) geri döndük ve boyutunu 180px'ten 140px'e çekerek görsel yoğunluğu azalttık.

### 1.3. İletişim Formunun Kullanıcıyı Siteden Fırlatması
**Ne Yaptık:** İletişim formunu arka uç (backend) yazmadan e-postaya bağlamak için HTML formunun `action` niteliğine doğrudan Formsubmit.co URL'sini ekledik.
**Nerede Takıldık:** Formsubmit'in varsayılan HTML davranışı, mesaj başarıyla gönderildiğinde kullanıcıyı sitemizden çıkartıp kendi basit ve çirkin "Thank You" sayfasına yönlendirmesiydi. Bu, premium bir sitede kabul edilemez bir kullanıcı deneyimiydi.
**Nasıl Çözdük:** Formsubmit'in `/ajax/` uç noktasını (endpoint) kullanarak formu JavaScript `fetch` API ile arka planda gönderdik. Başarı durumunu yakalayıp kendi sitemizin içinde, formu gizleyerek çok şık bir "Mesajınız İletildi!" animasyonu çıkardık.

---

## 2. Ne Öğrendik? (Çıkarılan Dersler)

1. **"Less is More" Kuralı:** Hero bölümündeki dev "SUERTA CO." yazısının altındaki gölgeyi (text-shadow) silmek veya logoların boyutunu devasadan zarif ölçeklere çekmek, sitenin kurumsal ve "Site of the Year" ciddiyetine çok daha fazla katkı sağladı. Premium tasarım karmaşık olmak zorunda değildir, temiz olmalıdır.
2. **Inline Style ve Keyframe Çatışması:** React'te inline style ile `transform` verirken, o elementte çalışan CSS keyframe animasyonlarının bitiş anındaki değerlerin inline kodları tamamen silebileceğini yaşayarak tecrübe ettik.
3. **R3F (React Three Fiber) Performansı:** Ekranda çok fazla 3D etkileşim (drag/orbit/presentation) olduğunda, eğer standart web scroll'u ile entegre edilmezse felaket performans sorunları yaratır. Scroll olan sitelerde 3D elementler sadece "izlemeli" (hover/parallax) olmalıdır, "sürüklemeli" (draggable) olmamalıdır.
4. **Hatalı Kelimeler / Arrogance Kontrolü:** Vizyon metinlerinde "SOTY (Site of the Year) standartlarında" gibi henüz kazanılmamış, iddialı kelimeler kullanmak itici olabilir. Bu kelimeleri silerek markanın özgüvenini eylemlere ve tasarıma bıraktık.

## 3. Eklenen Tatlı Detaylar (Micro-Interactions)
- Sağ alttaki WhatsApp butonunun üzerinden her 60 saniyede bir son derece yavaş ve gerçekçi hızda geçen, gizli bir "Sümüklü Böcek (🐌)" animasyonu eklendi. Bu tür beklenmedik mikro detaylar, sitenin ruhunu yansıtıyor.

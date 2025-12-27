// Run this in the console to get all the links
// (() => { const t=document.createElement('textarea'); t.value=JSON.stringify([...document.querySelectorAll('a')].map(a=>({text:a.innerText.trim(),href:a.href,alt:[...a.querySelectorAll('img')].map(i=>i.alt).join(' | ')||null})),null,2); document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); console.log('Copied to clipboard'); })()
// find and replace "chant" for "download"
// find and replace using this regex (?<=href:\s*'[^']*)',\s*$ with &format=gabc',
export const sources = [
  {
    text: 'Alleluia (T. P. Laud. Dom.)',
    href: 'https://gregobase.selapa.net/download.php?id=12936&format=gabc',
  },
  {
    text: 'Alleluia Dominus regnavit',
    href: 'https://gregobase.selapa.net/download.php?id=12697&format=gabc',
  },
  {
    text: 'Benedictionem ómnium géntium',
    href: 'https://gregobase.selapa.net/download.php?id=17569&format=gabc',
  },
  {
    text: 'In aetérnum misericórdia',
    href: 'https://gregobase.selapa.net/download.php?id=17570&format=gabc',
  },
  {
    text: 'Benedicam te in vita',
    href: 'https://gregobase.selapa.net/download.php?id=12813&format=gabc',
  },
  {
    text: 'Benedícam te',
    href: 'https://gregobase.selapa.net/download.php?id=17571&format=gabc',
  },
  {
    text: 'Non pepercísti',
    href: 'https://gregobase.selapa.net/download.php?id=17572&format=gabc',
  },
  {
    text: 'Recordáre, Virgo Mater',
    href: 'https://gregobase.selapa.net/download.php?id=17573&format=gabc',
  },
  {
    text: 'Jubilate Deo omnis',
    href: 'https://gregobase.selapa.net/download.php?id=12115&format=gabc',
  },
  {
    text: 'Tres pueri jussu regis',
    href: 'https://gregobase.selapa.net/download.php?id=13305&format=gabc',
  },
  {
    text: 'Alleluia Laudate',
    href: 'https://gregobase.selapa.net/download.php?id=13109&format=gabc',
  },
  {
    text: 'Aeterne rerum Conditor',
    href: 'https://gregobase.selapa.net/download.php?id=13348&format=gabc',
  },
  {
    text: 'Ecce jam noctis tenuatur',
    href: 'https://gregobase.selapa.net/download.php?id=12721&format=gabc',
  },
  {
    text: 'Ecce jam noctis tenuatur (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=12397&format=gabc',
  },
  {
    text: 'Jam lucis orto sidere (In Dom. et Minor. Festis)',
    href: 'https://gregobase.selapa.net/download.php?id=12589&format=gabc',
  },
  {
    text: 'Jam lucis orto sidere (ord. Sund.)',
    href: 'https://gregobase.selapa.net/download.php?id=2994&format=gabc&elem=1',
  },
  {
    text: 'Jam lucis orto sidere (In Major. Festis)',
    href: 'https://gregobase.selapa.net/download.php?id=12563&format=gabc',
  },
  {
    text: 'Jam lucis orto sidere (Solemn feasts)',
    href: 'https://gregobase.selapa.net/download.php?id=2995&format=gabc&elem=1',
  },
  {
    text: 'Alleluia confitemini. (Sundays throughout the year at Prime)',
    href: 'https://gregobase.selapa.net/download.php?id=3007&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Sund. P. T. at Prime)',
    href: 'https://gregobase.selapa.net/download.php?id=3000&format=gabc&elem=1',
  },
  {
    text: 'Alleluia Confitemini',
    href: 'https://gregobase.selapa.net/download.php?id=12222&format=gabc',
  },
  {
    text: 'Alleluia confitemini. (Sundays throughout the year at Prime)',
    href: 'https://gregobase.selapa.net/download.php?id=3007&format=gabc&elem=1',
  },
  {
    text: 'Christe Fili Dei vivi (per Annum)',
    href: 'https://gregobase.selapa.net/download.php?id=11818&format=gabc',
  },
  {
    text: 'Alleluia (T. P. ad Primam)',
    href: 'https://gregobase.selapa.net/download.php?id=12219&format=gabc',
  },
  {
    text: 'Alleluia. (Sund. P. T. at Prime)',
    href: 'https://gregobase.selapa.net/download.php?id=3000&format=gabc&elem=1',
  },
  {
    text: 'Christe Fili Dei vivi',
    href: 'https://gregobase.selapa.net/download.php?id=3102&format=gabc&elem=1',
  },
  {
    text: 'Christe Fili Dei vivi (Tempore Adventus)',
    href: 'https://gregobase.selapa.net/download.php?id=13127&format=gabc',
  },
  {
    text: 'Christe Fili Dei',
    href: 'https://gregobase.selapa.net/download.php?id=3167&format=gabc&elem=1',
  },
  {
    text: 'Christe Fili Dei vivi (Tempore Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=12439&format=gabc',
  },
  {
    text: 'Christe Fili Dei (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3053&format=gabc&elem=1',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (In Dom. et Minor. Fest.)',
    href: 'https://gregobase.selapa.net/download.php?id=12527&format=gabc&elem=1',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (In Major. Festis)',
    href: 'https://gregobase.selapa.net/download.php?id=12715&format=gabc',
  },
  {
    text: 'Alleluia deduc me. (Sundays throughout the year at Terce)',
    href: 'https://gregobase.selapa.net/download.php?id=1943&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Sund. P. T. at Terce)',
    href: 'https://gregobase.selapa.net/download.php?id=1873&format=gabc&elem=1',
  },
  {
    text: 'Inclina cor meum',
    href: 'https://gregobase.selapa.net/download.php?id=12571&format=gabc&elem=1',
  },
  {
    text: 'Alleluia Deduc me',
    href: 'https://gregobase.selapa.net/download.php?id=13170&format=gabc',
  },
  {
    text: 'Alleluia deduc me. (Sundays throughout the year at Terce)',
    href: 'https://gregobase.selapa.net/download.php?id=1943&format=gabc&elem=1',
  },
  {
    text: 'Inclina cor meum',
    href: 'https://gregobase.selapa.net/download.php?id=3050&format=gabc&elem=1',
  },
  {
    text: 'Veni ad liberandum',
    href: 'https://gregobase.selapa.net/download.php?id=12407&format=gabc&elem=1',
  },
  {
    text: 'Ipse liberavit me',
    href: 'https://gregobase.selapa.net/download.php?id=13201&format=gabc',
  },
  {
    text: 'Veni ad liberandum',
    href: 'https://gregobase.selapa.net/download.php?id=3159&format=gabc&elem=1',
  },
  {
    text: 'Ipse liberavit',
    href: 'https://gregobase.selapa.net/download.php?id=3093&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. ad Tertiam)',
    href: 'https://gregobase.selapa.net/download.php?id=12066&format=gabc',
  },
  {
    text: 'Erue a framea',
    href: 'https://gregobase.selapa.net/download.php?id=12163&format=gabc&elem=1',
  },
  {
    text: 'Surrexit Dominus de sepulcro',
    href: 'https://gregobase.selapa.net/download.php?id=12369&format=gabc&elem=1',
  },
  {
    text: 'Erue a framea',
    href: 'https://gregobase.selapa.net/download.php?id=3088&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Sund. P. T. at Terce)',
    href: 'https://gregobase.selapa.net/download.php?id=1873&format=gabc&elem=1',
  },
  {
    text: 'Surrexit Dominus de sepulcro',
    href: 'https://gregobase.selapa.net/download.php?id=3061&format=gabc&elem=1',
  },
  {
    text: 'Rector potens verax Deus (in Dom. et Minor. Festis)',
    href: 'https://gregobase.selapa.net/download.php?id=12355&format=gabc',
  },
  {
    text: 'Rector potens (In Dominicis per Annum)',
    href: 'https://gregobase.selapa.net/download.php?id=2348&format=gabc&elem=1',
  },
  {
    text: 'Rector potens (In Festis majoribus)',
    href: 'https://gregobase.selapa.net/download.php?id=2239&format=gabc&elem=1',
  },
  {
    text: 'Rector potens verax Deus (In Major. Festis)',
    href: 'https://gregobase.selapa.net/download.php?id=12854&format=gabc',
  },
  {
    text: 'Alleluia tuus sum ego. (Sundays throughout the year at Sext)',
    href: 'https://gregobase.selapa.net/download.php?id=2674&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Sund. P. T. at Sext)',
    href: 'https://gregobase.selapa.net/download.php?id=2025&format=gabc&elem=1',
  },
  {
    text: 'Alleluia Tuus sum',
    href: 'https://gregobase.selapa.net/download.php?id=12741&format=gabc',
  },
  {
    text: 'Alleluia tuus sum ego. (Sundays throughout the year at Sext)',
    href: 'https://gregobase.selapa.net/download.php?id=2674&format=gabc&elem=1',
  },
  {
    text: 'In aeternum',
    href: 'https://gregobase.selapa.net/download.php?id=3225&format=gabc&elem=1',
  },
  {
    text: 'In aeternum Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12983&format=gabc',
  },
  {
    text: 'Ostende nobis Domine',
    href: 'https://gregobase.selapa.net/download.php?id=11745&format=gabc',
  },
  {
    text: 'Scapulis suis',
    href: 'https://gregobase.selapa.net/download.php?id=12215&format=gabc&elem=1',
  },
  {
    text: 'Ostende nobis',
    href: 'https://gregobase.selapa.net/download.php?id=3070&format=gabc&elem=1',
  },
  {
    text: 'Scapulis suis',
    href: 'https://gregobase.selapa.net/download.php?id=3186&format=gabc&elem=1',
  },
  {
    text: 'Surrexit Dominus vere',
    href: 'https://gregobase.selapa.net/download.php?id=12476&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. ad Sextam)',
    href: 'https://gregobase.selapa.net/download.php?id=12732&format=gabc',
  },
  {
    text: 'De ore leonis',
    href: 'https://gregobase.selapa.net/download.php?id=3095&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Sund. P. T. at Sext)',
    href: 'https://gregobase.selapa.net/download.php?id=2025&format=gabc&elem=1',
  },
  {
    text: 'Surrexit Dominus vere',
    href: 'https://gregobase.selapa.net/download.php?id=3107&format=gabc&elem=1',
  },
  {
    text: 'Rerum Deus tenax vigor (In Dom. et Minor. Festis)',
    href: 'https://gregobase.selapa.net/download.php?id=12799&format=gabc',
  },
  {
    text: 'Rerum Deus (In Dominicis per Annum)',
    href: 'https://gregobase.selapa.net/download.php?id=2242&format=gabc&elem=1',
  },
  {
    text: 'Rerum Deus (In Solemnitatibus)',
    href: 'https://gregobase.selapa.net/download.php?id=1836&format=gabc&elem=1',
  },
  {
    text: 'Rerum Deus tenax vigor (In Major. Festis)',
    href: 'https://gregobase.selapa.net/download.php?id=12187&format=gabc&elem=1',
  },
  {
    text: 'Alleluia faciem tuam. (Sundays throughout the year at None)',
    href: 'https://gregobase.selapa.net/download.php?id=2215&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Sund. P. T. at None)',
    href: 'https://gregobase.selapa.net/download.php?id=2124&format=gabc&elem=1',
  },
  {
    text: 'Alleluia Faciem tuam',
    href: 'https://gregobase.selapa.net/download.php?id=12028&format=gabc',
  },
  {
    text: 'Alleluia faciem tuam. (Sundays throughout the year at None)',
    href: 'https://gregobase.selapa.net/download.php?id=2215&format=gabc&elem=1',
  },
  {
    text: 'Clamavi in toto',
    href: 'https://gregobase.selapa.net/download.php?id=11782&format=gabc&elem=1',
  },
  {
    text: 'Scuto circumdabit te',
    href: 'https://gregobase.selapa.net/download.php?id=12080&format=gabc&elem=1',
  },
  {
    text: 'Clamavi in toto',
    href: 'https://gregobase.selapa.net/download.php?id=3158&format=gabc&elem=1',
  },
  {
    text: 'Super te Jerusalem orietur',
    href: 'https://gregobase.selapa.net/download.php?id=3173&format=gabc&elem=1',
  },
  {
    text: 'Scuto circumdabit te',
    href: 'https://gregobase.selapa.net/download.php?id=3168&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. ad Nonam)',
    href: 'https://gregobase.selapa.net/download.php?id=12524&format=gabc',
  },
  {
    text: 'Ne perdas cum impiis',
    href: 'https://gregobase.selapa.net/download.php?id=13106&format=gabc&elem=1',
  },
  {
    text: 'Gavisi sunt discipuli',
    href: 'https://gregobase.selapa.net/download.php?id=13169&format=gabc&elem=1',
  },
  {
    text: 'Ne perdas cum impiis',
    href: 'https://gregobase.selapa.net/download.php?id=716&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Sund. P. T. at None)',
    href: 'https://gregobase.selapa.net/download.php?id=2124&format=gabc&elem=1',
  },
  {
    text: 'Gavisi sunt discipuli',
    href: 'https://gregobase.selapa.net/download.php?id=3080&format=gabc&elem=1',
  },
  {
    text: 'Dixit Dominus Domino',
    href: 'https://gregobase.selapa.net/download.php?id=2767&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Sund. P. T. at Vespers)',
    href: 'https://gregobase.selapa.net/download.php?id=2622&format=gabc&elem=1',
  },
  {
    text: 'Dixit Dominus Domino',
    href: 'https://gregobase.selapa.net/download.php?id=12551&format=gabc&elem=1',
  },
  {
    text: 'Magna opera Domini',
    href: 'https://gregobase.selapa.net/download.php?id=12747&format=gabc&elem=1',
  },
  {
    text: 'Dixit Dominus Domino',
    href: 'https://gregobase.selapa.net/download.php?id=2767&format=gabc&elem=1',
  },
  {
    text: 'Magna opera Domini',
    href: 'https://gregobase.selapa.net/download.php?id=2908&format=gabc&elem=1',
  },
  {
    text: 'Qui timet Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=12152&format=gabc&elem=1',
  },
  {
    text: 'Qui timet Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=2741&format=gabc&elem=1',
  },
  {
    text: 'Sit nomen Domini... in',
    href: 'https://gregobase.selapa.net/download.php?id=1864&format=gabc&elem=1',
  },
  {
    text: 'Sit nomen Domini',
    href: 'https://gregobase.selapa.net/download.php?id=11989&format=gabc&elem=1',
  },
  {
    text: 'Sit nomen Domini... in',
    href: 'https://gregobase.selapa.net/download.php?id=1864&format=gabc&elem=1',
  },
  {
    text: 'Sit nomen Domini',
    href: 'https://gregobase.selapa.net/download.php?id=11989&format=gabc&elem=1',
  },
  {
    text: 'Deus autem noster',
    href: 'https://gregobase.selapa.net/download.php?id=2882&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Vesp. Dom.)',
    href: 'https://gregobase.selapa.net/download.php?id=12083&format=gabc',
  },
  {
    text: 'Deus autem noster',
    href: 'https://gregobase.selapa.net/download.php?id=12366&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Vesp. Dom.)',
    href: 'https://gregobase.selapa.net/download.php?id=12566&format=gabc',
  },
  {
    text: 'Lucis Creator optime',
    href: 'https://gregobase.selapa.net/download.php?id=13307&format=gabc',
  },
  {
    text: 'Deus autem noster',
    href: 'https://gregobase.selapa.net/download.php?id=2882&format=gabc&elem=1',
  },
  {
    text: 'Deus autem noster',
    href: 'https://gregobase.selapa.net/download.php?id=18620&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Sund. P. T. at Vespers)',
    href: 'https://gregobase.selapa.net/download.php?id=2622&format=gabc&elem=1',
  },
  {
    text: 'Lucis Creator optime (Alius tonus I (ad libitum))',
    href: 'https://gregobase.selapa.net/download.php?id=11976&format=gabc',
  },
  {
    text: 'Lucis Creator optime (Alius tonus II)',
    href: 'https://gregobase.selapa.net/download.php?id=12055&format=gabc',
  },
  {
    text: 'Beata Dei Genitrix Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=2810&format=gabc&elem=1',
  },
  {
    text: 'Beata Dei Genitrix Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=12223&format=gabc&elem=1',
  },
  {
    text: 'Beata Dei Genitrix Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=12269&format=gabc&elem=1',
  },
  {
    text: 'Sancti omnes intercedant',
    href: 'https://gregobase.selapa.net/download.php?id=12218&format=gabc',
  },
  {
    text: 'Crucifixus surrexit',
    href: 'https://gregobase.selapa.net/download.php?id=12127&format=gabc',
  },
  {
    text: 'Crucifixus surrexit',
    href: 'https://gregobase.selapa.net/download.php?id=12386&format=gabc',
  },
  {
    text: 'Crucifixus',
    href: 'https://gregobase.selapa.net/download.php?id=2642&format=gabc&elem=1',
  },
  {
    text: 'Miserere mihi',
    href: 'https://gregobase.selapa.net/download.php?id=1896&format=gabc&elem=1',
  },
  {
    text: 'Miserere mihi',
    href: 'https://gregobase.selapa.net/download.php?id=12592&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Fer. et Fest. Simpl.)',
    href: 'https://gregobase.selapa.net/download.php?id=13354&format=gabc',
  },
  {
    text: 'Miserere mihi',
    href: 'https://gregobase.selapa.net/download.php?id=1896&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (T.P. ad Completorium)',
    href: 'https://gregobase.selapa.net/download.php?id=1942&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Major. Festis per Annum)',
    href: 'https://gregobase.selapa.net/download.php?id=12379&format=gabc',
  },
  {
    text: 'Te lucis ante terminum (in dominicis per annum)',
    href: 'https://gregobase.selapa.net/download.php?id=1843&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Dom. et Minor. Festis per Annum)',
    href: 'https://gregobase.selapa.net/download.php?id=12910&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (T. Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=12092&format=gabc',
  },
  {
    text: 'Te lucis ante terminum (In Festis et Oct. B. M. V.)',
    href: 'https://gregobase.selapa.net/download.php?id=11857&format=gabc',
  },
  {
    text: 'In manus tuas Domine (Tempore Adventus)',
    href: 'https://gregobase.selapa.net/download.php?id=12702&format=gabc',
  },
  {
    text: 'In manus tuas Domine (Per Annum)',
    href: 'https://gregobase.selapa.net/download.php?id=13059&format=gabc',
  },
  {
    text: 'In manus tuas',
    href: 'https://gregobase.selapa.net/download.php?id=7667&format=gabc&elem=1',
  },
  {
    text: 'In manus tuas Domine (Tempore Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=12649&format=gabc',
  },
  {
    text: 'Salva nos Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2924&format=gabc&elem=1',
  },
  {
    text: 'Salva nos Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2924&format=gabc&elem=1',
  },
  {
    text: 'Alma Redemptoris',
    href: 'https://gregobase.selapa.net/download.php?id=2238&format=gabc&elem=1',
  },
  {
    text: 'Alma Redemptoris',
    href: 'https://gregobase.selapa.net/download.php?id=11878&format=gabc&elem=1',
  },
  {
    text: 'Ave Regina caelorum',
    href: 'https://gregobase.selapa.net/download.php?id=12108&format=gabc&elem=1',
  },
  {
    text: 'Ave Regina caelorum',
    href: 'https://gregobase.selapa.net/download.php?id=12705&format=gabc&elem=1',
  },
  {
    text: 'Ave Regina caelorum',
    href: 'https://gregobase.selapa.net/download.php?id=2602&format=gabc&elem=1',
  },
  {
    text: 'Regina caeli laetare',
    href: 'https://gregobase.selapa.net/download.php?id=12130&format=gabc',
  },
  {
    text: 'Regina caeli laetare',
    href: 'https://gregobase.selapa.net/download.php?id=12975&format=gabc',
  },
  {
    text: 'Regina caeli',
    href: 'https://gregobase.selapa.net/download.php?id=1976&format=gabc&elem=1',
  },
  {
    text: 'Salve Regina (simplex)',
    href: 'https://gregobase.selapa.net/download.php?id=13136&format=gabc',
  },
  {
    text: 'Salve Regina',
    href: 'https://gregobase.selapa.net/download.php?id=2715&format=gabc&elem=1',
  },
  {
    text: 'Salve Regina',
    href: 'https://gregobase.selapa.net/download.php?id=11861&format=gabc&elem=1',
  },
  {
    text: 'Iste Confessor (Conf. not Bishop) 5',
    href: 'https://gregobase.selapa.net/download.php?id=18950&format=gabc',
  },
  {
    text: 'Alma Redemptoris (simple tone)',
    href: 'https://gregobase.selapa.net/download.php?id=1851&format=gabc&elem=1',
  },
  {
    text: 'Alma Redemptoris',
    href: 'https://gregobase.selapa.net/download.php?id=11798&format=gabc&elem=1',
  },
  {
    text: 'Ave Regina caelorum',
    href: 'https://gregobase.selapa.net/download.php?id=12108&format=gabc&elem=1',
  },
  {
    text: 'Regina caeli laetare',
    href: 'https://gregobase.selapa.net/download.php?id=12130&format=gabc',
  },
  {
    text: 'Ave Regina caelorum',
    href: 'https://gregobase.selapa.net/download.php?id=12705&format=gabc&elem=1',
  },
  {
    text: 'Regina caeli laetare',
    href: 'https://gregobase.selapa.net/download.php?id=12975&format=gabc',
  },
  {
    text: 'Salve Regina (simplex)',
    href: 'https://gregobase.selapa.net/download.php?id=13136&format=gabc',
  },
  {
    text: 'Ave Regina caelorum (simple tone)',
    href: 'https://gregobase.selapa.net/download.php?id=2153&format=gabc&elem=1',
  },
  {
    text: 'Regina caeli (simple tone)',
    href: 'https://gregobase.selapa.net/download.php?id=2290&format=gabc&elem=1',
  },
  {
    text: 'Intende voci',
    href: 'https://gregobase.selapa.net/download.php?id=12094&format=gabc&elem=1',
  },
  {
    text: 'Jubilate Deo in voce',
    href: 'https://gregobase.selapa.net/download.php?id=12604&format=gabc',
  },
  {
    text: 'Jubilate Deo',
    href: 'https://gregobase.selapa.net/download.php?id=8230&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Laud. Fer. II.)',
    href: 'https://gregobase.selapa.net/download.php?id=12984&format=gabc',
  },
  {
    text: 'Intende voci',
    href: 'https://gregobase.selapa.net/download.php?id=8231&format=gabc&elem=1',
  },
  {
    text: 'Deus majestatis',
    href: 'https://gregobase.selapa.net/download.php?id=11864&format=gabc&elem=1',
  },
  {
    text: 'Deus majestatis',
    href: 'https://gregobase.selapa.net/download.php?id=8232&format=gabc&elem=1',
  },
  {
    text: 'Laudamus nomen tuum',
    href: 'https://gregobase.selapa.net/download.php?id=12173&format=gabc&elem=1',
  },
  {
    text: 'Laudate Dominum omnes',
    href: 'https://gregobase.selapa.net/download.php?id=12483&format=gabc',
  },
  {
    text: 'Laudamus nomen tuum',
    href: 'https://gregobase.selapa.net/download.php?id=8233&format=gabc&elem=1',
  },
  {
    text: 'Laudate Dominum omnes gentes',
    href: 'https://gregobase.selapa.net/download.php?id=8234&format=gabc&elem=1',
  },
  {
    text: 'Splendor paternae',
    href: 'https://gregobase.selapa.net/download.php?id=15781&format=gabc',
  },
  {
    text: 'Miserere mei Deus secundum',
    href: 'https://gregobase.selapa.net/download.php?id=11769&format=gabc',
  },
  {
    text: 'Deduc me in justitia',
    href: 'https://gregobase.selapa.net/download.php?id=12426&format=gabc',
  },
  {
    text: 'Benedictus Dominus Deus',
    href: 'https://gregobase.selapa.net/download.php?id=12723&format=gabc',
  },
  {
    text: 'Laudate Dominum quoniam',
    href: 'https://gregobase.selapa.net/download.php?id=11812&format=gabc',
  },
  {
    text: 'Dominus dabit virtutem',
    href: 'https://gregobase.selapa.net/download.php?id=12547&format=gabc',
  },
  {
    text: 'Conversus est furor',
    href: 'https://gregobase.selapa.net/download.php?id=13129&format=gabc',
  },
  {
    text: 'Jam lucis orto sidere (In Feriis et Fest. Simpl.)',
    href: 'https://gregobase.selapa.net/download.php?id=11944&format=gabc',
  },
  {
    text: 'Innocens manibus',
    href: 'https://gregobase.selapa.net/download.php?id=2734&format=gabc&elem=1',
  },
  {
    text: 'Innocens manibus',
    href: 'https://gregobase.selapa.net/download.php?id=12545&format=gabc&elem=1',
  },
  {
    text: 'Vivo ego',
    href: 'https://gregobase.selapa.net/download.php?id=12733&format=gabc',
  },
  {
    text: 'Innocens manibus',
    href: 'https://gregobase.selapa.net/download.php?id=2734&format=gabc&elem=1',
  },
  {
    text: 'Libera me Domine et pone',
    href: 'https://gregobase.selapa.net/download.php?id=12847&format=gabc',
  },
  {
    text: 'Nunc Sancte nobis (In Feriis per Annum)',
    href: 'https://gregobase.selapa.net/download.php?id=2578&format=gabc&elem=1',
  },
  {
    text: 'Illuminatio mea',
    href: 'https://gregobase.selapa.net/download.php?id=2803&format=gabc&elem=1',
  },
  {
    text: 'Illuminatio mea',
    href: 'https://gregobase.selapa.net/download.php?id=12393&format=gabc&elem=1',
  },
  {
    text: 'Illuminatio mea',
    href: 'https://gregobase.selapa.net/download.php?id=2803&format=gabc&elem=1',
  },
  {
    text: 'Sana animam meam',
    href: 'https://gregobase.selapa.net/download.php?id=3213&format=gabc&elem=1',
  },
  {
    text: 'Sana animam meam',
    href: 'https://gregobase.selapa.net/download.php?id=12569&format=gabc&elem=1',
  },
  {
    text: 'Advenerunt nobis',
    href: 'https://gregobase.selapa.net/download.php?id=13088&format=gabc',
  },
  {
    text: 'Judicasti Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12134&format=gabc',
  },
  {
    text: 'Judicasti Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12970&format=gabc',
  },
  {
    text: 'Rector potens verax Deus (In Fer. et Fest. Simpl.)',
    href: 'https://gregobase.selapa.net/download.php?id=11789&format=gabc',
  },
  {
    text: 'In tua justitia',
    href: 'https://gregobase.selapa.net/download.php?id=1894&format=gabc&elem=1',
  },
  {
    text: 'In tua justitia',
    href: 'https://gregobase.selapa.net/download.php?id=12420&format=gabc&elem=1',
  },
  {
    text: 'In tua justitia',
    href: 'https://gregobase.selapa.net/download.php?id=1894&format=gabc&elem=1',
  },
  {
    text: 'Benedicam Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=11837&format=gabc',
  },
  {
    text: 'Commendemus nosmetipsos',
    href: 'https://gregobase.selapa.net/download.php?id=12198&format=gabc',
  },
  {
    text: 'Popule meus',
    href: 'https://gregobase.selapa.net/download.php?id=11918&format=gabc',
  },
  {
    text: 'Popule meus',
    href: 'https://gregobase.selapa.net/download.php?id=12801&format=gabc',
  },
  {
    text: 'Rerum Deus tenax vigor (In Fer. et Fest. Simpl.)',
    href: 'https://gregobase.selapa.net/download.php?id=13226&format=gabc',
  },
  {
    text: 'Exsultate justi',
    href: 'https://gregobase.selapa.net/download.php?id=2783&format=gabc&elem=1',
  },
  {
    text: 'Exsultate justi',
    href: 'https://gregobase.selapa.net/download.php?id=2783&format=gabc&elem=1',
  },
  {
    text: 'Redime me Domine',
    href: 'https://gregobase.selapa.net/download.php?id=11967&format=gabc',
  },
  {
    text: 'Per arma justitiae',
    href: 'https://gregobase.selapa.net/download.php?id=12264&format=gabc',
  },
  {
    text: 'Numquid-redditur',
    href: 'https://gregobase.selapa.net/download.php?id=12109&format=gabc',
  },
  {
    text: 'Numquid redditur',
    href: 'https://gregobase.selapa.net/download.php?id=12996&format=gabc',
  },
  {
    text: 'Inclinavit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=13089&format=gabc&elem=1',
  },
  {
    text: 'Inclinavit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2022&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Vesp. Fer. II.)',
    href: 'https://gregobase.selapa.net/download.php?id=11922&format=gabc',
  },
  {
    text: 'Vota mea Domino',
    href: 'https://gregobase.selapa.net/download.php?id=12125&format=gabc',
  },
  {
    text: 'Alleluia. (Monday P. T. at Vespers)',
    href: 'https://gregobase.selapa.net/download.php?id=2822&format=gabc&elem=1',
  },
  {
    text: 'Vota mea',
    href: 'https://gregobase.selapa.net/download.php?id=2157&format=gabc&elem=1',
  },
  {
    text: 'Laetatus sum in his',
    href: 'https://gregobase.selapa.net/download.php?id=11993&format=gabc',
  },
  {
    text: 'Clamavi et Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12368&format=gabc&elem=1',
  },
  {
    text: 'Auxilium meum',
    href: 'https://gregobase.selapa.net/download.php?id=13288&format=gabc&elem=1',
  },
  {
    text: 'Clamavi et Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=1938&format=gabc&elem=1',
  },
  {
    text: 'Auxilium meum',
    href: 'https://gregobase.selapa.net/download.php?id=2600&format=gabc&elem=1',
  },
  {
    text: 'Laetatus sum',
    href: 'https://gregobase.selapa.net/download.php?id=2694&format=gabc&elem=1',
  },
  {
    text: 'Immense caeli',
    href: 'https://gregobase.selapa.net/download.php?id=2655&format=gabc&elem=1',
  },
  {
    text: 'Immense caeli Conditor',
    href: 'https://gregobase.selapa.net/download.php?id=12470&format=gabc',
  },
  {
    text: 'Magnificat anima',
    href: 'https://gregobase.selapa.net/download.php?id=13046&format=gabc',
  },
  {
    text: 'Salvum me fac',
    href: 'https://gregobase.selapa.net/download.php?id=2683&format=gabc&elem=1',
  },
  {
    text: 'Salvum me fac',
    href: 'https://gregobase.selapa.net/download.php?id=13181&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Laud. Fer. III.)',
    href: 'https://gregobase.selapa.net/download.php?id=12503&format=gabc',
  },
  {
    text: 'Cantate Domino et benedicite',
    href: 'https://gregobase.selapa.net/download.php?id=12541&format=gabc',
  },
  {
    text: 'Salutare vultus',
    href: 'https://gregobase.selapa.net/download.php?id=13345&format=gabc',
  },
  {
    text: 'Illumina Domine vultum',
    href: 'https://gregobase.selapa.net/download.php?id=12398&format=gabc',
  },
  {
    text: 'Exaltate Regem saeculorum',
    href: 'https://gregobase.selapa.net/download.php?id=12373&format=gabc',
  },
  {
    text: 'Laudate nomen Domini',
    href: 'https://gregobase.selapa.net/download.php?id=12909&format=gabc',
  },
  {
    text: 'Ales diei nuntius',
    href: 'https://gregobase.selapa.net/download.php?id=12157&format=gabc',
  },
  {
    text: 'Erexit nobis Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=11804&format=gabc',
  },
  {
    text: 'Deus misereatur',
    href: 'https://gregobase.selapa.net/download.php?id=11927&format=gabc',
  },
  {
    text: 'Discerne causam meam Deus',
    href: 'https://gregobase.selapa.net/download.php?id=12640&format=gabc',
  },
  {
    text: 'Dele iniquitatem',
    href: 'https://gregobase.selapa.net/download.php?id=12870&format=gabc',
  },
  {
    text: 'Laudate Dominum quia',
    href: 'https://gregobase.selapa.net/download.php?id=12229&format=gabc',
  },
  {
    text: 'Corripies me Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12351&format=gabc',
  },
  {
    text: 'Deus meus in te confido',
    href: 'https://gregobase.selapa.net/download.php?id=2871&format=gabc&elem=1',
  },
  {
    text: 'Deus meus in te',
    href: 'https://gregobase.selapa.net/download.php?id=12661&format=gabc',
  },
  {
    text: 'Deus meus in te confido',
    href: 'https://gregobase.selapa.net/download.php?id=2871&format=gabc&elem=1',
  },
  {
    text: 'Respexit me',
    href: 'https://gregobase.selapa.net/download.php?id=2755&format=gabc&elem=1',
  },
  {
    text: 'Respexit me et exaudivit',
    href: 'https://gregobase.selapa.net/download.php?id=12128&format=gabc',
  },
  {
    text: 'Respexit me',
    href: 'https://gregobase.selapa.net/download.php?id=2755&format=gabc&elem=1',
  },
  {
    text: 'Suscepisti me',
    href: 'https://gregobase.selapa.net/download.php?id=2033&format=gabc&elem=1',
  },
  {
    text: 'Suscepisti me',
    href: 'https://gregobase.selapa.net/download.php?id=13209&format=gabc&elem=1',
  },
  {
    text: 'Salvasti nos',
    href: 'https://gregobase.selapa.net/download.php?id=2568&format=gabc&elem=1',
  },
  {
    text: 'Salvasti nos Domine',
    href: 'https://gregobase.selapa.net/download.php?id=11939&format=gabc',
  },
  {
    text: 'Qui habitas in caelis',
    href: 'https://gregobase.selapa.net/download.php?id=12515&format=gabc',
  },
  {
    text: 'Salvasti nos',
    href: 'https://gregobase.selapa.net/download.php?id=2568&format=gabc&elem=1',
  },
  {
    text: 'Qui habitas',
    href: 'https://gregobase.selapa.net/download.php?id=2292&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Tuesday P. T. at Vespers)',
    href: 'https://gregobase.selapa.net/download.php?id=2293&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Vesp. Fer. III.)',
    href: 'https://gregobase.selapa.net/download.php?id=12785&format=gabc',
  },
  {
    text: 'In circuitu populi',
    href: 'https://gregobase.selapa.net/download.php?id=13256&format=gabc',
  },
  {
    text: 'Adjutorium nostrum',
    href: 'https://gregobase.selapa.net/download.php?id=2426&format=gabc&elem=1',
  },
  {
    text: 'In circuitu',
    href: 'https://gregobase.selapa.net/download.php?id=2595&format=gabc&elem=1',
  },
  {
    text: 'Magnificavit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12008&format=gabc&elem=1',
  },
  {
    text: 'Magnificavit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2285&format=gabc&elem=1',
  },
  {
    text: 'Dominus aedificet',
    href: 'https://gregobase.selapa.net/download.php?id=1824&format=gabc&elem=1',
  },
  {
    text: 'Dominus aedificet',
    href: 'https://gregobase.selapa.net/download.php?id=12306&format=gabc&elem=1',
  },
  {
    text: 'Telluris alme Conditor',
    href: 'https://gregobase.selapa.net/download.php?id=12258&format=gabc',
  },
  {
    text: 'Telluris alme',
    href: 'https://gregobase.selapa.net/download.php?id=1924&format=gabc&elem=1',
  },
  {
    text: 'Exsultavit spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=12360&format=gabc',
  },
  {
    text: 'Tu Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2125&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Laud. Fer. IV.)',
    href: 'https://gregobase.selapa.net/download.php?id=12059&format=gabc',
  },
  {
    text: 'Dominus regnavit',
    href: 'https://gregobase.selapa.net/download.php?id=12452&format=gabc',
  },
  {
    text: 'Tu Domine servabis',
    href: 'https://gregobase.selapa.net/download.php?id=12667&format=gabc',
  },
  {
    text: 'Tu Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2125&format=gabc&elem=1',
  },
  {
    text: 'Te decet hymnus',
    href: 'https://gregobase.selapa.net/download.php?id=12333&format=gabc',
  },
  {
    text: 'Tibi Domine psallam',
    href: 'https://gregobase.selapa.net/download.php?id=12835&format=gabc',
  },
  {
    text: 'Domine magnus es',
    href: 'https://gregobase.selapa.net/download.php?id=12568&format=gabc',
  },
  {
    text: 'Laudabo Deum meum',
    href: 'https://gregobase.selapa.net/download.php?id=13276&format=gabc',
  },
  {
    text: 'Nox et tenebrae',
    href: 'https://gregobase.selapa.net/download.php?id=12147&format=gabc',
  },
  {
    text: 'De manu omnium',
    href: 'https://gregobase.selapa.net/download.php?id=11871&format=gabc',
  },
  {
    text: 'Amplius lava me',
    href: 'https://gregobase.selapa.net/download.php?id=12040&format=gabc',
  },
  {
    text: 'Impietatibus nostris',
    href: 'https://gregobase.selapa.net/download.php?id=12789&format=gabc',
  },
  {
    text: 'In innocentia cordis',
    href: 'https://gregobase.selapa.net/download.php?id=12856&format=gabc',
  },
  {
    text: 'Lauda anima mea',
    href: 'https://gregobase.selapa.net/download.php?id=12845&format=gabc',
  },
  {
    text: 'Exsultavit ... qui humiliat',
    href: 'https://gregobase.selapa.net/download.php?id=13205&format=gabc',
  },
  {
    text: 'Misericordia tua Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12966&format=gabc',
  },
  {
    text: 'Misericordia tua Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12966&format=gabc',
  },
  {
    text: 'Deus adjuvat me',
    href: 'https://gregobase.selapa.net/download.php?id=2636&format=gabc',
  },
  {
    text: 'Deus adjuvat me',
    href: 'https://gregobase.selapa.net/download.php?id=2636&format=gabc',
  },
  {
    text: 'In Deo speravi',
    href: 'https://gregobase.selapa.net/download.php?id=2436&format=gabc&elem=1',
  },
  {
    text: 'In Deo speravi',
    href: 'https://gregobase.selapa.net/download.php?id=12863&format=gabc&elem=1',
  },
  {
    text: 'In Deo speravi',
    href: 'https://gregobase.selapa.net/download.php?id=2436&format=gabc&elem=1',
  },
  {
    text: 'Deus meus misericordia',
    href: 'https://gregobase.selapa.net/download.php?id=2699&format=gabc&elem=1',
  },
  {
    text: 'Deus meus misericordia',
    href: 'https://gregobase.selapa.net/download.php?id=12116&format=gabc&elem=1',
  },
  {
    text: 'Beati omnes qui timent',
    href: 'https://gregobase.selapa.net/download.php?id=12335&format=gabc',
  },
  {
    text: 'Confundantur omnes',
    href: 'https://gregobase.selapa.net/download.php?id=12591&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Vesp. Fer. IV.)',
    href: 'https://gregobase.selapa.net/download.php?id=12794&format=gabc',
  },
  {
    text: 'Deus meus misericordia',
    href: 'https://gregobase.selapa.net/download.php?id=2699&format=gabc&elem=1',
  },
  {
    text: 'Beati omnes',
    href: 'https://gregobase.selapa.net/download.php?id=2266&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Wednesday P. T. at Vespers)',
    href: 'https://gregobase.selapa.net/download.php?id=2197&format=gabc&elem=1',
  },
  {
    text: 'Confundantur omnes',
    href: 'https://gregobase.selapa.net/download.php?id=2915&format=gabc&elem=1',
  },
  {
    text: 'De profundis clamavi',
    href: 'https://gregobase.selapa.net/download.php?id=12738&format=gabc',
  },
  {
    text: 'Domine non est exaltatum',
    href: 'https://gregobase.selapa.net/download.php?id=13058&format=gabc&elem=1',
  },
  {
    text: 'De profundis',
    href: 'https://gregobase.selapa.net/download.php?id=2316&format=gabc&elem=1',
  },
  {
    text: 'Domine non est exaltatum',
    href: 'https://gregobase.selapa.net/download.php?id=2332&format=gabc&elem=1',
  },
  {
    text: 'Elegit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12300&format=gabc&elem=1',
  },
  {
    text: 'Elegit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2708&format=gabc&elem=1',
  },
  {
    text: 'Caeli Deus sanctissime',
    href: 'https://gregobase.selapa.net/download.php?id=12615&format=gabc&elem=1',
  },
  {
    text: 'Respexit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12810&format=gabc&elem=1',
  },
  {
    text: 'Immittet Angelus',
    href: 'https://gregobase.selapa.net/download.php?id=2609&format=gabc&elem=1',
  },
  {
    text: 'Immittet Angelus',
    href: 'https://gregobase.selapa.net/download.php?id=12429&format=gabc&elem=1',
  },
  {
    text: 'Immittet Angelus',
    href: 'https://gregobase.selapa.net/download.php?id=2609&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Laud. Fer. V.)',
    href: 'https://gregobase.selapa.net/download.php?id=12840&format=gabc',
  },
  {
    text: 'Jubilate in conspectu',
    href: 'https://gregobase.selapa.net/download.php?id=12594&format=gabc',
  },
  {
    text: 'Domine refugium',
    href: 'https://gregobase.selapa.net/download.php?id=12624&format=gabc',
  },
  {
    text: 'Domine in caelo',
    href: 'https://gregobase.selapa.net/download.php?id=13193&format=gabc',
  },
  {
    text: 'Populus meus ait',
    href: 'https://gregobase.selapa.net/download.php?id=12045&format=gabc',
  },
  {
    text: 'Deo nostro jucunda',
    href: 'https://gregobase.selapa.net/download.php?id=12013&format=gabc',
  },
  {
    text: 'Lux ecce surgit aurea',
    href: 'https://gregobase.selapa.net/download.php?id=12882&format=gabc',
  },
  {
    text: 'In sanctitate serviamus',
    href: 'https://gregobase.selapa.net/download.php?id=12907&format=gabc',
  },
  {
    text: 'Convertere Domine et',
    href: 'https://gregobase.selapa.net/download.php?id=11889&format=gabc',
  },
  {
    text: 'Tibi soli peccavi',
    href: 'https://gregobase.selapa.net/download.php?id=12456&format=gabc',
  },
  {
    text: 'Multiplicasti',
    href: 'https://gregobase.selapa.net/download.php?id=15782&format=gabc',
  },
  {
    text: 'Fortitudo mea et laus',
    href: 'https://gregobase.selapa.net/download.php?id=12852&format=gabc',
  },
  {
    text: 'Laudate Dominum qui sanat',
    href: 'https://gregobase.selapa.net/download.php?id=13266&format=gabc',
  },
  {
    text: 'In loco pascuae ibi Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2905&format=gabc&elem=1',
  },
  {
    text: 'In loco pascuae',
    href: 'https://gregobase.selapa.net/download.php?id=13146&format=gabc',
  },
  {
    text: 'In loco pascuae ibi Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2905&format=gabc&elem=1',
  },
  {
    text: 'Quam bonus',
    href: 'https://gregobase.selapa.net/download.php?id=2250&format=gabc&elem=1',
  },
  {
    text: 'Quam bonus Israel Deus',
    href: 'https://gregobase.selapa.net/download.php?id=12728&format=gabc',
  },
  {
    text: 'Quam bonus',
    href: 'https://gregobase.selapa.net/download.php?id=2250&format=gabc&elem=1',
  },
  {
    text: 'Memor esto',
    href: 'https://gregobase.selapa.net/download.php?id=1922&format=gabc&elem=1',
  },
  {
    text: 'Memor esto',
    href: 'https://gregobase.selapa.net/download.php?id=13333&format=gabc&elem=1',
  },
  {
    text: 'Memor esto',
    href: 'https://gregobase.selapa.net/download.php?id=1922&format=gabc&elem=1',
  },
  {
    text: 'Invocabimus',
    href: 'https://gregobase.selapa.net/download.php?id=2035&format=gabc&elem=1',
  },
  {
    text: 'Invocabimus nomen',
    href: 'https://gregobase.selapa.net/download.php?id=12633&format=gabc',
  },
  {
    text: 'Invocabimus',
    href: 'https://gregobase.selapa.net/download.php?id=2035&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Vesp. Fer. V.)',
    href: 'https://gregobase.selapa.net/download.php?id=12472&format=gabc',
  },
  {
    text: 'Ecce quam (Vesp. Fer. V)',
    href: 'https://gregobase.selapa.net/download.php?id=12654&format=gabc',
  },
  {
    text: 'Ecce quam bonum',
    href: 'https://gregobase.selapa.net/download.php?id=2540&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Thursday P. T. at Vespers)',
    href: 'https://gregobase.selapa.net/download.php?id=2383&format=gabc&elem=1',
  },
  {
    text: 'Confitemini Domino quoniam (Antiphona)',
    href: 'https://gregobase.selapa.net/download.php?id=2287&format=gabc&elem=1',
  },
  {
    text: 'Confitemini Domino quia (Antiphona)',
    href: 'https://gregobase.selapa.net/download.php?id=12777&format=gabc&elem=1',
  },
  {
    text: 'Confitemini Domino quia (Antiphona)',
    href: 'https://gregobase.selapa.net/download.php?id=1891&format=gabc&elem=1',
  },
  {
    text: 'Adhaereat lingua',
    href: 'https://gregobase.selapa.net/download.php?id=12233&format=gabc&elem=1',
  },
  {
    text: 'Confitebor nomini tuo',
    href: 'https://gregobase.selapa.net/download.php?id=12538&format=gabc',
  },
  {
    text: 'Adhaereat lingua',
    href: 'https://gregobase.selapa.net/download.php?id=1887&format=gabc&elem=1',
  },
  {
    text: 'Confitebor nomini',
    href: 'https://gregobase.selapa.net/download.php?id=2036&format=gabc&elem=1',
  },
  {
    text: 'Magnae Deus potentiae',
    href: 'https://gregobase.selapa.net/download.php?id=12274&format=gabc',
  },
  {
    text: 'Fecit Deus potentiam',
    href: 'https://gregobase.selapa.net/download.php?id=11863&format=gabc',
  },
  {
    text: 'Adjutor meus',
    href: 'https://gregobase.selapa.net/download.php?id=2011&format=gabc&elem=1',
  },
  {
    text: 'Exaltate Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=11808&format=gabc',
  },
  {
    text: 'Adjutor meus',
    href: 'https://gregobase.selapa.net/download.php?id=12067&format=gabc&elem=1',
  },
  {
    text: 'Adjutor meus',
    href: 'https://gregobase.selapa.net/download.php?id=2011&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Laud. Fer. VI.)',
    href: 'https://gregobase.selapa.net/download.php?id=12424&format=gabc',
  },
  {
    text: 'Eripe me de inimicis... Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12440&format=gabc',
  },
  {
    text: 'Benedixisti Domine',
    href: 'https://gregobase.selapa.net/download.php?id=11790&format=gabc',
  },
  {
    text: 'In Domino justificabitur',
    href: 'https://gregobase.selapa.net/download.php?id=12968&format=gabc',
  },
  {
    text: 'Lauda Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=12844&format=gabc',
  },
  {
    text: 'Aeterna caeli gloria',
    href: 'https://gregobase.selapa.net/download.php?id=13176&format=gabc',
  },
  {
    text: 'Per viscera misericordiae',
    href: 'https://gregobase.selapa.net/download.php?id=12053&format=gabc',
  },
  {
    text: 'Propter nomen tuum',
    href: 'https://gregobase.selapa.net/download.php?id=12146&format=gabc',
  },
  {
    text: 'Deus tu conversus',
    href: 'https://gregobase.selapa.net/download.php?id=12536&format=gabc',
  },
  {
    text: 'Cor contritum',
    href: 'https://gregobase.selapa.net/download.php?id=12797&format=gabc',
  },
  {
    text: 'Cum iratus fueris',
    href: 'https://gregobase.selapa.net/download.php?id=12804&format=gabc',
  },
  {
    text: 'Lauda Deum tuum',
    href: 'https://gregobase.selapa.net/download.php?id=12280&format=gabc',
  },
  {
    text: 'Ne discedas',
    href: 'https://gregobase.selapa.net/download.php?id=2286&format=gabc&elem=1',
  },
  {
    text: 'Ne discedas a me',
    href: 'https://gregobase.selapa.net/download.php?id=12075&format=gabc',
  },
  {
    text: 'Ne discedas',
    href: 'https://gregobase.selapa.net/download.php?id=2286&format=gabc&elem=1',
  },
  {
    text: 'Excita Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2779&format=gabc&elem=1',
  },
  {
    text: 'Excita Domine',
    href: 'https://gregobase.selapa.net/download.php?id=13278&format=gabc&elem=1',
  },
  {
    text: 'Excita Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2779&format=gabc&elem=1',
  },
  {
    text: 'Beati qui habitant',
    href: 'https://gregobase.selapa.net/download.php?id=2372&format=gabc',
  },
  {
    text: 'Beati qui habitant',
    href: 'https://gregobase.selapa.net/download.php?id=12185&format=gabc',
  },
  {
    text: 'Misericordia et veritas',
    href: 'https://gregobase.selapa.net/download.php?id=2513&format=gabc&elem=1',
  },
  {
    text: 'Domine probasti me',
    href: 'https://gregobase.selapa.net/download.php?id=12326&format=gabc',
  },
  {
    text: 'Misericordia et veritas',
    href: 'https://gregobase.selapa.net/download.php?id=12692&format=gabc&elem=1',
  },
  {
    text: 'Misericordia et veritas',
    href: 'https://gregobase.selapa.net/download.php?id=2513&format=gabc&elem=1',
  },
  {
    text: 'Domine probasti',
    href: 'https://gregobase.selapa.net/download.php?id=2222&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Vesp. Fer. VI.)',
    href: 'https://gregobase.selapa.net/download.php?id=11984&format=gabc',
  },
  {
    text: 'Mirabilia opera',
    href: 'https://gregobase.selapa.net/download.php?id=12651&format=gabc',
  },
  {
    text: 'Alleluia. (Friday P. T. at Vespers)',
    href: 'https://gregobase.selapa.net/download.php?id=2090&format=gabc&elem=1',
  },
  {
    text: 'Mirabilia opera tua',
    href: 'https://gregobase.selapa.net/download.php?id=2590&format=gabc&elem=1',
  },
  {
    text: 'Ne derelinquas me',
    href: 'https://gregobase.selapa.net/download.php?id=2108&format=gabc&elem=1',
  },
  {
    text: 'Domine clamavi',
    href: 'https://gregobase.selapa.net/download.php?id=12825&format=gabc&elem=1',
  },
  {
    text: 'Educ de custodia',
    href: 'https://gregobase.selapa.net/download.php?id=13053&format=gabc&elem=1',
  },
  {
    text: 'Domine clamavi',
    href: 'https://gregobase.selapa.net/download.php?id=2040&format=gabc&elem=1',
  },
  {
    text: 'Educ de custodia',
    href: 'https://gregobase.selapa.net/download.php?id=2404&format=gabc&elem=1',
  },
  {
    text: 'Hominis superne Conditor',
    href: 'https://gregobase.selapa.net/download.php?id=13191&format=gabc',
  },
  {
    text: 'Deposuit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=11785&format=gabc',
  },
  {
    text: 'Voce mea',
    href: 'https://gregobase.selapa.net/download.php?id=2819&format=gabc&elem=1',
  },
  {
    text: 'Voce mea ad Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=12581&format=gabc',
  },
  {
    text: 'Voce mea',
    href: 'https://gregobase.selapa.net/download.php?id=2819&format=gabc&elem=1',
  },
  {
    text: 'Filii Sion',
    href: 'https://gregobase.selapa.net/download.php?id=12286&format=gabc',
  },
  {
    text: 'Alleluia (T. P. Laud. Sabb.)',
    href: 'https://gregobase.selapa.net/download.php?id=12162&format=gabc',
  },
  {
    text: 'Quam magnificata sunt',
    href: 'https://gregobase.selapa.net/download.php?id=13235&format=gabc',
  },
  {
    text: 'Laetabitur justus',
    href: 'https://gregobase.selapa.net/download.php?id=13007&format=gabc',
  },
  {
    text: 'Ostende nobis',
    href: 'https://gregobase.selapa.net/download.php?id=12941&format=gabc&elem=1',
  },
  {
    text: 'Omnis spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=13312&format=gabc&elem=1',
  },
  {
    text: 'Aurora jam spargit',
    href: 'https://gregobase.selapa.net/download.php?id=12329&format=gabc',
  },
  {
    text: 'Benigne fac Domine',
    href: 'https://gregobase.selapa.net/download.php?id=11896&format=gabc',
  },
  {
    text: 'Antequam convenirent',
    href: 'https://gregobase.selapa.net/download.php?id=12719&format=gabc',
  },
  {
    text: 'Illumina Domine sedentes',
    href: 'https://gregobase.selapa.net/download.php?id=13110&format=gabc',
  },
  {
    text: 'A timore inimici',
    href: 'https://gregobase.selapa.net/download.php?id=12403&format=gabc',
  },
  {
    text: 'Rectus Dominus Deus',
    href: 'https://gregobase.selapa.net/download.php?id=13028&format=gabc',
  },
  {
    text: 'In servis suis',
    href: 'https://gregobase.selapa.net/download.php?id=13132&format=gabc',
  },
  {
    text: 'Laudate Dominum secundum',
    href: 'https://gregobase.selapa.net/download.php?id=12073&format=gabc',
  },
  {
    text: 'Exaltare Domine',
    href: 'https://gregobase.selapa.net/download.php?id=1884&format=gabc&elem=1',
  },
  {
    text: 'Exaltare Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12853&format=gabc&elem=1',
  },
  {
    text: 'Exaltare Domine',
    href: 'https://gregobase.selapa.net/download.php?id=1884&format=gabc&elem=1',
  },
  {
    text: 'Clamor meus',
    href: 'https://gregobase.selapa.net/download.php?id=2167&format=gabc&elem=1',
  },
  {
    text: 'Clamor meus Domine',
    href: 'https://gregobase.selapa.net/download.php?id=11817&format=gabc',
  },
  {
    text: 'Domine Deus meus',
    href: 'https://gregobase.selapa.net/download.php?id=2658&format=gabc&elem=1',
  },
  {
    text: 'Domine Deus meus',
    href: 'https://gregobase.selapa.net/download.php?id=13196&format=gabc&elem=1',
  },
  {
    text: 'Domine Deus meus',
    href: 'https://gregobase.selapa.net/download.php?id=2658&format=gabc&elem=1',
  },
  {
    text: 'Ne tacueris',
    href: 'https://gregobase.selapa.net/download.php?id=2863&format=gabc&elem=1',
  },
  {
    text: 'Ne tacueris Deus',
    href: 'https://gregobase.selapa.net/download.php?id=12506&format=gabc',
  },
  {
    text: 'Ne tacueris',
    href: 'https://gregobase.selapa.net/download.php?id=2863&format=gabc&elem=1',
  },
  {
    text: 'Benedictus Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=1969&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Saturday P. T. at Vespers)',
    href: 'https://gregobase.selapa.net/download.php?id=3004&format=gabc&elem=1',
  },
  {
    text: 'Beatus populus',
    href: 'https://gregobase.selapa.net/download.php?id=12408&format=gabc&elem=1',
  },
  {
    text: 'Benedictus Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12989&format=gabc&elem=1',
  },
  {
    text: 'Beatus populus',
    href: 'https://gregobase.selapa.net/download.php?id=2187&format=gabc&elem=1',
  },
  {
    text: 'Magnus Dominus... et magnitudinis',
    href: 'https://gregobase.selapa.net/download.php?id=2142&format=gabc&elem=1',
  },
  {
    text: 'Suavis Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=13100&format=gabc&elem=1',
  },
  {
    text: 'Magnus Dominus... et magnitudinis',
    href: 'https://gregobase.selapa.net/download.php?id=2142&format=gabc&elem=1',
  },
  {
    text: 'Magnus Dominus... et magnitudinis',
    href: 'https://gregobase.selapa.net/download.php?id=12421&format=gabc&elem=1',
  },
  {
    text: 'Suavis Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2349&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Vesp. Sabb.)',
    href: 'https://gregobase.selapa.net/download.php?id=11987&format=gabc',
  },
  {
    text: 'Fidelis Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12820&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Vesp. Sabb.)',
    href: 'https://gregobase.selapa.net/download.php?id=13192&format=gabc',
  },
  {
    text: 'Fidelis Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=1984&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (Saturday P. T. at Vespers)',
    href: 'https://gregobase.selapa.net/download.php?id=3004&format=gabc&elem=1',
  },
  {
    text: 'Jam sol recedit',
    href: 'https://gregobase.selapa.net/download.php?id=12474&format=gabc',
  },
  {
    text: 'Suscepit Deus Israel',
    href: 'https://gregobase.selapa.net/download.php?id=12960&format=gabc',
  },
  {
    text: 'Jam sol recedit igneus',
    href: 'https://gregobase.selapa.net/download.php?id=2077&format=gabc&elem=1',
  },
  {
    text: 'Suscepit Deus',
    href: 'https://gregobase.selapa.net/download.php?id=2564&format=gabc&elem=1',
  },
  {
    text: 'Intret oratio mea',
    href: 'https://gregobase.selapa.net/download.php?id=1848&format=gabc&elem=1',
  },
  {
    text: 'Intret oratio mea',
    href: 'https://gregobase.selapa.net/download.php?id=1848&format=gabc&elem=1',
  },
  {
    text: 'Alleluia. (T.P. ad Completorium)',
    href: 'https://gregobase.selapa.net/download.php?id=1942&format=gabc&elem=1',
  },
  {
    text: 'Creator alme siderum',
    href: 'https://gregobase.selapa.net/download.php?id=11815&format=gabc',
  },
  {
    text: 'Ecce nomen Domini venit',
    href: 'https://gregobase.selapa.net/download.php?id=2875&format=gabc&elem=1',
  },
  {
    text: 'Ecce nomen Domini venit',
    href: 'https://gregobase.selapa.net/download.php?id=13219&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Adventu)',
    href: 'https://gregobase.selapa.net/download.php?id=12752&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Adventu)',
    href: 'https://gregobase.selapa.net/download.php?id=2498&format=gabc&elem=1',
  },
  {
    text: 'In illa die',
    href: 'https://gregobase.selapa.net/download.php?id=13253&format=gabc&elem=1',
  },
  {
    text: 'In illa die',
    href: 'https://gregobase.selapa.net/download.php?id=2835&format=gabc&elem=1',
  },
  {
    text: 'Jucundare filia',
    href: 'https://gregobase.selapa.net/download.php?id=2392&format=gabc&elem=1',
  },
  {
    text: 'Jucundare filia',
    href: 'https://gregobase.selapa.net/download.php?id=11953&format=gabc&elem=1',
  },
  {
    text: 'Ecce veniet propheta',
    href: 'https://gregobase.selapa.net/download.php?id=12276&format=gabc',
  },
  {
    text: 'Omnes sitientes',
    href: 'https://gregobase.selapa.net/download.php?id=12279&format=gabc&elem=1',
  },
  {
    text: 'Ecce Dominus veniet',
    href: 'https://gregobase.selapa.net/download.php?id=2289&format=gabc&elem=1',
  },
  {
    text: 'Ecce Dominus veniet',
    href: 'https://gregobase.selapa.net/download.php?id=11773&format=gabc&elem=1',
  },
  {
    text: 'Omnes sitientes',
    href: 'https://gregobase.selapa.net/download.php?id=1876&format=gabc&elem=1',
  },
  {
    text: 'Ecce veniet Propheta',
    href: 'https://gregobase.selapa.net/download.php?id=2631&format=gabc&elem=1',
  },
  {
    text: 'En clara vox',
    href: 'https://gregobase.selapa.net/download.php?id=11919&format=gabc',
  },
  {
    text: 'Spiritus Sanctus ... ne timeas',
    href: 'https://gregobase.selapa.net/download.php?id=12304&format=gabc',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (In Adventu)',
    href: 'https://gregobase.selapa.net/download.php?id=11781&format=gabc',
  },
  {
    text: 'Jam lucis orto sidere (In Adventu)',
    href: 'https://gregobase.selapa.net/download.php?id=19235&format=gabc&elem=1',
  },
  {
    text: 'Rector potens (In Adventu)',
    href: 'https://gregobase.selapa.net/download.php?id=19236&format=gabc',
  },
  {
    text: 'Nunc Sancte nobis (In Adventu)',
    href: 'https://gregobase.selapa.net/download.php?id=2889&format=gabc&elem=1',
  },
  {
    text: 'Ne timeas Maria ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=11899&format=gabc',
  },
  {
    text: 'Ne timeas',
    href: 'https://gregobase.selapa.net/download.php?id=2629&format=gabc&elem=1',
  },
  {
    text: 'Angelus Domini nuntiavit',
    href: 'https://gregobase.selapa.net/download.php?id=13074&format=gabc',
  },
  {
    text: 'Leva Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=11764&format=gabc',
  },
  {
    text: 'De Sion exibit',
    href: 'https://gregobase.selapa.net/download.php?id=11819&format=gabc',
  },
  {
    text: 'Veniet fortior me',
    href: 'https://gregobase.selapa.net/download.php?id=11882&format=gabc',
  },
  {
    text: 'Benedicta tu in mulieribus',
    href: 'https://gregobase.selapa.net/download.php?id=12807&format=gabc',
  },
  {
    text: 'Quaerite Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=13038&format=gabc',
  },
  {
    text: 'Exspectabo Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=12824&format=gabc&elem=1',
  },
  {
    text: 'Ex Aegypto vocavi',
    href: 'https://gregobase.selapa.net/download.php?id=13293&format=gabc',
  },
  {
    text: 'Exspectabo Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=2713&format=gabc&elem=1',
  },
  {
    text: 'Ecce veniet Deus',
    href: 'https://gregobase.selapa.net/download.php?id=13206&format=gabc&elem=1',
  },
  {
    text: 'Ex Aegypto',
    href: 'https://gregobase.selapa.net/download.php?id=2354&format=gabc&elem=1',
  },
  {
    text: 'Veni Domine visitare',
    href: 'https://gregobase.selapa.net/download.php?id=13153&format=gabc',
  },
  {
    text: 'Sion noli timere',
    href: 'https://gregobase.selapa.net/download.php?id=13325&format=gabc&elem=1',
  },
  {
    text: 'Sion noli timere',
    href: 'https://gregobase.selapa.net/download.php?id=2270&format=gabc&elem=1',
  },
  {
    text: 'Veni Domine visitare nos',
    href: 'https://gregobase.selapa.net/download.php?id=2686&format=gabc&elem=1',
  },
  {
    text: 'Urbs fortitudinis',
    href: 'https://gregobase.selapa.net/download.php?id=12660&format=gabc&elem=1',
  },
  {
    text: 'Ecce in nubibus',
    href: 'https://gregobase.selapa.net/download.php?id=13215&format=gabc&elem=1',
  },
  {
    text: 'Ecce in nubibus',
    href: 'https://gregobase.selapa.net/download.php?id=2102&format=gabc&elem=1',
  },
  {
    text: 'Urbs fortitudinis',
    href: 'https://gregobase.selapa.net/download.php?id=1927&format=gabc&elem=1',
  },
  {
    text: 'Ecce apparebit',
    href: 'https://gregobase.selapa.net/download.php?id=2626&format=gabc&elem=1',
  },
  {
    text: 'Ecce apparebit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12475&format=gabc',
  },
  {
    text: 'Montes et colles',
    href: 'https://gregobase.selapa.net/download.php?id=12019&format=gabc&elem=1',
  },
  {
    text: 'Montes et colles',
    href: 'https://gregobase.selapa.net/download.php?id=2768&format=gabc&elem=1',
  },
  {
    text: 'Ecce Dominus noster... ut illuminet',
    href: 'https://gregobase.selapa.net/download.php?id=2376&format=gabc&elem=1',
  },
  {
    text: 'Joannes autem cum audisset',
    href: 'https://gregobase.selapa.net/download.php?id=12175&format=gabc',
  },
  {
    text: 'Joannes autem',
    href: 'https://gregobase.selapa.net/download.php?id=2679&format=gabc&elem=1',
  },
  {
    text: 'De caelo veniet',
    href: 'https://gregobase.selapa.net/download.php?id=13093&format=gabc&elem=1',
  },
  {
    text: 'Tu es qui venturus es an alium',
    href: 'https://gregobase.selapa.net/download.php?id=13204&format=gabc',
  },
  {
    text: 'Tu es qui venturus es... an alium',
    href: 'https://gregobase.selapa.net/download.php?id=2504&format=gabc&elem=1',
  },
  {
    text: 'De caelo veniet',
    href: 'https://gregobase.selapa.net/download.php?id=2395&format=gabc&elem=1',
  },
  {
    text: 'Ecce Rex veniet',
    href: 'https://gregobase.selapa.net/download.php?id=11752&format=gabc',
  },
  {
    text: 'Super te Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=12580&format=gabc',
  },
  {
    text: 'Vox clamantis',
    href: 'https://gregobase.selapa.net/download.php?id=12676&format=gabc',
  },
  {
    text: 'Ecce mitto Angelum',
    href: 'https://gregobase.selapa.net/download.php?id=12839&format=gabc',
  },
  {
    text: 'Ecce Rex',
    href: 'https://gregobase.selapa.net/download.php?id=2405&format=gabc&elem=1',
  },
  {
    text: 'Super te Jerusalem orietur',
    href: 'https://gregobase.selapa.net/download.php?id=2303&format=gabc&elem=1',
  },
  {
    text: 'Vox clamantis in deserto',
    href: 'https://gregobase.selapa.net/download.php?id=2481&format=gabc&elem=1',
  },
  {
    text: 'Ecce mitto',
    href: 'https://gregobase.selapa.net/download.php?id=2706&format=gabc&elem=1',
  },
  {
    text: 'Tu es qui venturus es Domine',
    href: 'https://gregobase.selapa.net/download.php?id=11832&format=gabc&elem=1',
  },
  {
    text: 'Qui post me venit',
    href: 'https://gregobase.selapa.net/download.php?id=12049&format=gabc&elem=1',
  },
  {
    text: 'Sion renovaberis',
    href: 'https://gregobase.selapa.net/download.php?id=12758&format=gabc&elem=1',
  },
  {
    text: 'Dicite pusillanimes',
    href: 'https://gregobase.selapa.net/download.php?id=13015&format=gabc',
  },
  {
    text: 'Sion renovaberis',
    href: 'https://gregobase.selapa.net/download.php?id=2752&format=gabc&elem=1',
  },
  {
    text: 'Tu es qui venturus es Domine',
    href: 'https://gregobase.selapa.net/download.php?id=1890&format=gabc&elem=1',
  },
  {
    text: 'Qui post me venit',
    href: 'https://gregobase.selapa.net/download.php?id=2742&format=gabc&elem=1',
  },
  {
    text: 'Levabit Dominus signum',
    href: 'https://gregobase.selapa.net/download.php?id=11898&format=gabc',
  },
  {
    text: 'Ante me non est',
    href: 'https://gregobase.selapa.net/download.php?id=12600&format=gabc&elem=1',
  },
  {
    text: 'Cantate Domino canticum',
    href: 'https://gregobase.selapa.net/download.php?id=13277&format=gabc',
  },
  {
    text: 'Ante me non est',
    href: 'https://gregobase.selapa.net/download.php?id=2616&format=gabc&elem=1',
  },
  {
    text: 'Dabo in Sion',
    href: 'https://gregobase.selapa.net/download.php?id=11813&format=gabc&elem=1',
  },
  {
    text: 'Jerusalem gaude',
    href: 'https://gregobase.selapa.net/download.php?id=13315&format=gabc&elem=1',
  },
  {
    text: 'Veniet Dominus et non',
    href: 'https://gregobase.selapa.net/download.php?id=2145&format=gabc&elem=1',
  },
  {
    text: 'Jerusalem gaude',
    href: 'https://gregobase.selapa.net/download.php?id=2116&format=gabc&elem=1',
  },
  {
    text: 'Dabo in Sion',
    href: 'https://gregobase.selapa.net/download.php?id=2830&format=gabc&elem=1',
  },
  {
    text: 'Juste et pie vivamus',
    href: 'https://gregobase.selapa.net/download.php?id=11923&format=gabc',
  },
  {
    text: 'Montes et omnes colles',
    href: 'https://gregobase.selapa.net/download.php?id=12232&format=gabc&elem=1',
  },
  {
    text: 'Super solium David',
    href: 'https://gregobase.selapa.net/download.php?id=12671&format=gabc',
  },
  {
    text: 'Montes et omnes colles',
    href: 'https://gregobase.selapa.net/download.php?id=2443&format=gabc&elem=1',
  },
  {
    text: 'Juste et pie',
    href: 'https://gregobase.selapa.net/download.php?id=1937&format=gabc&elem=1',
  },
  {
    text: 'Beata es Maria',
    href: 'https://gregobase.selapa.net/download.php?id=13018&format=gabc',
  },
  {
    text: 'Beata es Maria',
    href: 'https://gregobase.selapa.net/download.php?id=13037&format=gabc',
  },
  {
    text: 'Beata es Maria (3rd Sunday Advent)',
    href: 'https://gregobase.selapa.net/download.php?id=2027&format=gabc&elem=1',
  },
  {
    text: 'O Sapientia',
    href: 'https://gregobase.selapa.net/download.php?id=12570&format=gabc&elem=1',
  },
  {
    text: 'O Sapientia',
    href: 'https://gregobase.selapa.net/download.php?id=2169&format=gabc&elem=1',
  },
  {
    text: 'O Sapientia',
    href: 'https://gregobase.selapa.net/download.php?id=7450&format=gabc&elem=1',
  },
  {
    text: 'O radix Jesse',
    href: 'https://gregobase.selapa.net/download.php?id=12771&format=gabc&elem=1',
  },
  {
    text: 'O Adonai',
    href: 'https://gregobase.selapa.net/download.php?id=13013&format=gabc&elem=1',
  },
  {
    text: 'O Adonai',
    href: 'https://gregobase.selapa.net/download.php?id=2596&format=gabc&elem=1',
  },
  {
    text: 'O radix Jesse',
    href: 'https://gregobase.selapa.net/download.php?id=2203&format=gabc&elem=1',
  },
  {
    text: 'O Oriens splendor',
    href: 'https://gregobase.selapa.net/download.php?id=11874&format=gabc',
  },
  {
    text: 'O Rex gentium',
    href: 'https://gregobase.selapa.net/download.php?id=12069&format=gabc&elem=1',
  },
  {
    text: 'O clavis David',
    href: 'https://gregobase.selapa.net/download.php?id=12780&format=gabc',
  },
  {
    text: 'O Clavis David',
    href: 'https://gregobase.selapa.net/download.php?id=2877&format=gabc&elem=1',
  },
  {
    text: 'O Oriens',
    href: 'https://gregobase.selapa.net/download.php?id=2371&format=gabc&elem=1',
  },
  {
    text: 'O Rex gentium',
    href: 'https://gregobase.selapa.net/download.php?id=2133&format=gabc&elem=1',
  },
  {
    text: 'O Emmanuel',
    href: 'https://gregobase.selapa.net/download.php?id=12273&format=gabc&elem=1',
  },
  {
    text: 'Ecce veniet Dominus princeps',
    href: 'https://gregobase.selapa.net/download.php?id=13274&format=gabc',
  },
  {
    text: 'O Emmanuel',
    href: 'https://gregobase.selapa.net/download.php?id=2483&format=gabc&elem=1',
  },
  {
    text: 'Egredietur Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=11909&format=gabc',
  },
  {
    text: 'Haurietis aquas',
    href: 'https://gregobase.selapa.net/download.php?id=12197&format=gabc',
  },
  {
    text: 'Rorate caeli desuper',
    href: 'https://gregobase.selapa.net/download.php?id=12764&format=gabc',
  },
  {
    text: 'Ecce jam venit',
    href: 'https://gregobase.selapa.net/download.php?id=12857&format=gabc',
  },
  {
    text: 'Cum venerit Filius',
    href: 'https://gregobase.selapa.net/download.php?id=13147&format=gabc',
  },
  {
    text: 'Lex per Moysen',
    href: 'https://gregobase.selapa.net/download.php?id=12000&format=gabc',
  },
  {
    text: 'Emitte Agnum',
    href: 'https://gregobase.selapa.net/download.php?id=12041&format=gabc',
  },
  {
    text: 'Ut cognoscamus',
    href: 'https://gregobase.selapa.net/download.php?id=12425&format=gabc',
  },
  {
    text: 'Da mercedem Domine',
    href: 'https://gregobase.selapa.net/download.php?id=20397&format=gabc',
  },
  {
    text: 'Spiritus Domini super me',
    href: 'https://gregobase.selapa.net/download.php?id=11753&format=gabc',
  },
  {
    text: 'Propter Sion',
    href: 'https://gregobase.selapa.net/download.php?id=11836&format=gabc',
  },
  {
    text: 'Ecce veniet Dominus ut sedeat',
    href: 'https://gregobase.selapa.net/download.php?id=13116&format=gabc',
  },
  {
    text: 'Prophetae praedicaverunt',
    href: 'https://gregobase.selapa.net/download.php?id=13135&format=gabc',
  },
  {
    text: 'Annuntiate populis',
    href: 'https://gregobase.selapa.net/download.php?id=12021&format=gabc',
  },
  {
    text: 'De Sion veniet Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12190&format=gabc',
  },
  {
    text: 'Convertere Domine aliquantulum',
    href: 'https://gregobase.selapa.net/download.php?id=12299&format=gabc',
  },
  {
    text: 'De Sion veniet qui',
    href: 'https://gregobase.selapa.net/download.php?id=13141&format=gabc',
  },
  {
    text: 'Ad te Domine levavi',
    href: 'https://gregobase.selapa.net/download.php?id=12791&format=gabc',
  },
  {
    text: 'Dominus legifer',
    href: 'https://gregobase.selapa.net/download.php?id=12895&format=gabc',
  },
  {
    text: 'Ecce Deus meus',
    href: 'https://gregobase.selapa.net/download.php?id=12924&format=gabc',
  },
  {
    text: 'Constantes estote',
    href: 'https://gregobase.selapa.net/download.php?id=13173&format=gabc',
  },
  {
    text: 'Intuemini quam sit',
    href: 'https://gregobase.selapa.net/download.php?id=12029&format=gabc',
  },
  {
    text: 'Deus a Libano',
    href: 'https://gregobase.selapa.net/download.php?id=12230&format=gabc',
  },
  {
    text: 'Ego autem ad Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=12327&format=gabc',
  },
  {
    text: 'Veni Domine et noli',
    href: 'https://gregobase.selapa.net/download.php?id=12518&format=gabc',
  },
  {
    text: 'Multiplicabitur ejus imperium',
    href: 'https://gregobase.selapa.net/download.php?id=12926&format=gabc',
  },
  {
    text: 'Exspectetur sicut pluvia',
    href: 'https://gregobase.selapa.net/download.php?id=13077&format=gabc',
  },
  {
    text: 'Paratus esto Israel',
    href: 'https://gregobase.selapa.net/download.php?id=13267&format=gabc',
  },
  {
    text: 'Ego Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=13324&format=gabc',
  },
  {
    text: 'Egredietur virga',
    href: 'https://gregobase.selapa.net/download.php?id=11920&format=gabc',
  },
  {
    text: 'Nolite timere',
    href: 'https://gregobase.selapa.net/download.php?id=12599&format=gabc',
  },
  {
    text: 'Tu Bethlehem terra',
    href: 'https://gregobase.selapa.net/download.php?id=11750&format=gabc',
  },
  {
    text: 'Beatam me dicent omnes',
    href: 'https://gregobase.selapa.net/download.php?id=12818&format=gabc',
  },
  {
    text: 'Elevare elevare',
    href: 'https://gregobase.selapa.net/download.php?id=13009&format=gabc',
  },
  {
    text: 'Missus est Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=11827&format=gabc&elem=1',
  },
  {
    text: 'Missus est Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=11848&format=gabc&elem=1',
  },
  {
    text: 'Ecce ancilla Domini',
    href: 'https://gregobase.selapa.net/download.php?id=12613&format=gabc&elem=1',
  },
  {
    text: 'Ecce ancilla Domini',
    href: 'https://gregobase.selapa.net/download.php?id=13295&format=gabc&elem=1',
  },
  {
    text: 'Vigilate animo',
    href: 'https://gregobase.selapa.net/download.php?id=11910&format=gabc',
  },
  {
    text: 'Laetamini cum Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=12631&format=gabc',
  },
  {
    text: 'Ex quo facta est vox (Adv.)',
    href: 'https://gregobase.selapa.net/download.php?id=11883&format=gabc',
  },
  {
    text: 'Quomodo fiet istud',
    href: 'https://gregobase.selapa.net/download.php?id=12243&format=gabc',
  },
  {
    text: 'Hoc est testimonium',
    href: 'https://gregobase.selapa.net/download.php?id=12245&format=gabc',
  },
  {
    text: 'Quomodo fiet istud',
    href: 'https://gregobase.selapa.net/download.php?id=12103&format=gabc',
  },
  {
    text: 'Canite tuba',
    href: 'https://gregobase.selapa.net/download.php?id=12291&format=gabc',
  },
  {
    text: 'Erunt prava in directa',
    href: 'https://gregobase.selapa.net/download.php?id=11866&format=gabc',
  },
  {
    text: 'Ecce veniet desideratus',
    href: 'https://gregobase.selapa.net/download.php?id=12208&format=gabc&elem=1',
  },
  {
    text: 'Dominus veniet occurrite',
    href: 'https://gregobase.selapa.net/download.php?id=12363&format=gabc',
  },
  {
    text: 'Dominus veniet occurrite',
    href: 'https://gregobase.selapa.net/download.php?id=12445&format=gabc',
  },
  {
    text: 'Ecce veniet desideratus',
    href: 'https://gregobase.selapa.net/download.php?id=2675&format=gabc&elem=1',
  },
  {
    text: 'Erunt prava',
    href: 'https://gregobase.selapa.net/download.php?id=2801&format=gabc&elem=1',
  },
  {
    text: 'Dominus veniet',
    href: 'https://gregobase.selapa.net/download.php?id=2837&format=gabc&elem=1',
  },
  {
    text: 'Ave Maria ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=12998&format=gabc',
  },
  {
    text: 'Omnipotens sermo',
    href: 'https://gregobase.selapa.net/download.php?id=2440&format=gabc&elem=1',
  },
  {
    text: 'Dicit Dominus: Paenitentiam',
    href: 'https://gregobase.selapa.net/download.php?id=12783&format=gabc',
  },
  {
    text: 'Consurge consurge',
    href: 'https://gregobase.selapa.net/download.php?id=12473&format=gabc',
  },
  {
    text: 'Consolamini consolamini',
    href: 'https://gregobase.selapa.net/download.php?id=12710&format=gabc',
  },
  {
    text: 'Ponam in Sion',
    href: 'https://gregobase.selapa.net/download.php?id=12778&format=gabc',
  },
  {
    text: 'Ecce completa sunt',
    href: 'https://gregobase.selapa.net/download.php?id=12271&format=gabc',
  },
  {
    text: 'Judaea et Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=12485&format=gabc&elem=1',
  },
  {
    text: 'Judaea et Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=2256&format=gabc&elem=1',
  },
  {
    text: 'Hodie scietis',
    href: 'https://gregobase.selapa.net/download.php?id=2345&format=gabc&elem=1',
  },
  {
    text: 'Hodie scietis',
    href: 'https://gregobase.selapa.net/download.php?id=11960&format=gabc&elem=1',
  },
  {
    text: 'Crastina die',
    href: 'https://gregobase.selapa.net/download.php?id=11946&format=gabc&elem=1',
  },
  {
    text: 'Dominus veniet occurrite',
    href: 'https://gregobase.selapa.net/download.php?id=12363&format=gabc',
  },
  {
    text: 'Dominus veniet occurrite',
    href: 'https://gregobase.selapa.net/download.php?id=12445&format=gabc',
  },
  {
    text: 'Crastina erit vobis',
    href: 'https://gregobase.selapa.net/download.php?id=12534&format=gabc',
  },
  {
    text: 'Crastina die',
    href: 'https://gregobase.selapa.net/download.php?id=2461&format=gabc&elem=1',
  },
  {
    text: 'Dominus veniet',
    href: 'https://gregobase.selapa.net/download.php?id=2837&format=gabc&elem=1',
  },
  {
    text: 'Crastina erit',
    href: 'https://gregobase.selapa.net/download.php?id=2081&format=gabc&elem=1',
  },
  {
    text: 'Orietur sicut sol',
    href: 'https://gregobase.selapa.net/download.php?id=11917&format=gabc',
  },
  {
    text: 'Hodie scietis',
    href: 'https://gregobase.selapa.net/download.php?id=11924&format=gabc&elem=1',
  },
  {
    text: 'Hodie scietis',
    href: 'https://gregobase.selapa.net/download.php?id=3090&format=gabc&elem=1',
  },
  {
    text: 'Crastina die',
    href: 'https://gregobase.selapa.net/download.php?id=11982&format=gabc&elem=1',
  },
  {
    text: 'Crastina erit vobis',
    href: 'https://gregobase.selapa.net/download.php?id=12143&format=gabc',
  },
  {
    text: 'Crastina die',
    href: 'https://gregobase.selapa.net/download.php?id=3172&format=gabc&elem=1',
  },
  {
    text: 'Crastina Erit',
    href: 'https://gregobase.selapa.net/download.php?id=3162&format=gabc&elem=1',
  },
  {
    text: 'Rex pacificus',
    href: 'https://gregobase.selapa.net/download.php?id=11744&format=gabc&elem=1',
  },
  {
    text: 'Magnificatus est rex',
    href: 'https://gregobase.selapa.net/download.php?id=12213&format=gabc',
  },
  {
    text: 'Rex pacificus',
    href: 'https://gregobase.selapa.net/download.php?id=2996&format=gabc&elem=1',
  },
  {
    text: 'Magnificatus est',
    href: 'https://gregobase.selapa.net/download.php?id=3011&format=gabc&elem=1',
  },
  {
    text: 'Levate capita vestra',
    href: 'https://gregobase.selapa.net/download.php?id=11964&format=gabc&elem=1',
  },
  {
    text: 'Jesu Redemptor omnium (Nat.)',
    href: 'https://gregobase.selapa.net/download.php?id=12894&format=gabc',
  },
  {
    text: 'Completi sunt dies',
    href: 'https://gregobase.selapa.net/download.php?id=12974&format=gabc',
  },
  {
    text: 'Completi sunt',
    href: 'https://gregobase.selapa.net/download.php?id=2997&format=gabc',
  },
  {
    text: 'Scitote quia prope',
    href: 'https://gregobase.selapa.net/download.php?id=13199&format=gabc&elem=1',
  },
  {
    text: 'Levate capita vestra',
    href: 'https://gregobase.selapa.net/download.php?id=3006&format=gabc&elem=1',
  },
  {
    text: 'Jesu Redemptor omnium (T. Nativitatis)',
    href: 'https://gregobase.selapa.net/download.php?id=3001&format=gabc&elem=1',
  },
  {
    text: 'Cum ortus fuerit sol',
    href: 'https://gregobase.selapa.net/download.php?id=12284&format=gabc',
  },
  {
    text: 'Cum ortus fuerit',
    href: 'https://gregobase.selapa.net/download.php?id=3002&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Nativ. Domini)',
    href: 'https://gregobase.selapa.net/download.php?id=13339&format=gabc',
  },
  {
    text: 'Quem vidistis pastores',
    href: 'https://gregobase.selapa.net/download.php?id=12289&format=gabc',
  },
  {
    text: 'Genuit puerpera regem',
    href: 'https://gregobase.selapa.net/download.php?id=12539&format=gabc',
  },
  {
    text: 'Angelus ad pastores',
    href: 'https://gregobase.selapa.net/download.php?id=12743&format=gabc&elem=1',
  },
  {
    text: 'Genuit puerpera Regem',
    href: 'https://gregobase.selapa.net/download.php?id=2653&format=gabc&elem=1',
  },
  {
    text: 'Angelus ad pastores',
    href: 'https://gregobase.selapa.net/download.php?id=2421&format=gabc&elem=1',
  },
  {
    text: 'Parvulus filius',
    href: 'https://gregobase.selapa.net/download.php?id=12950&format=gabc&elem=1',
  },
  {
    text: 'Facta est',
    href: 'https://gregobase.selapa.net/download.php?id=2840&format=gabc&elem=1',
  },
  {
    text: 'Facta est cum Angelo',
    href: 'https://gregobase.selapa.net/download.php?id=12811&format=gabc&elem=1',
  },
  {
    text: 'Parvulus filius',
    href: 'https://gregobase.selapa.net/download.php?id=2913&format=gabc&elem=1',
  },
  {
    text: 'A solis ortus cardine',
    href: 'https://gregobase.selapa.net/download.php?id=11914&format=gabc&elem=1',
  },
  {
    text: 'A solis ortus cardine',
    href: 'https://gregobase.selapa.net/download.php?id=2628&format=gabc&elem=1',
  },
  {
    text: 'Gloria in excelsis',
    href: 'https://gregobase.selapa.net/download.php?id=12606&format=gabc&elem=1',
  },
  {
    text: 'Gloria in excelsis',
    href: 'https://gregobase.selapa.net/download.php?id=2782&format=gabc&elem=1',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (In Nativ. Domini)',
    href: 'https://gregobase.selapa.net/download.php?id=12945&format=gabc',
  },
  {
    text: 'Notum fecit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12516&format=gabc&elem=1',
  },
  {
    text: 'Verbum caro factum est',
    href: 'https://gregobase.selapa.net/download.php?id=12793&format=gabc&elem=1',
  },
  {
    text: 'Verbum caro factum est',
    href: 'https://gregobase.selapa.net/download.php?id=3142&format=gabc&elem=1',
  },
  {
    text: 'Notum fecit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=3104&format=gabc&elem=1',
  },
  {
    text: 'Viderunt omnes fines ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=11763&format=gabc',
  },
  {
    text: 'Tecum principium',
    href: 'https://gregobase.selapa.net/download.php?id=12887&format=gabc',
  },
  {
    text: 'Viderunt omnes',
    href: 'https://gregobase.selapa.net/download.php?id=3181&format=gabc&elem=1',
  },
  {
    text: 'Redemptionem misit',
    href: 'https://gregobase.selapa.net/download.php?id=12504&format=gabc&elem=1',
  },
  {
    text: 'Apud Dominum misericordia',
    href: 'https://gregobase.selapa.net/download.php?id=13296&format=gabc&elem=1',
  },
  {
    text: 'Exortum est in tenebris',
    href: 'https://gregobase.selapa.net/download.php?id=13350&format=gabc',
  },
  {
    text: 'Redemptionem misit',
    href: 'https://gregobase.selapa.net/download.php?id=2736&format=gabc&elem=1',
  },
  {
    text: 'Exortum est (Christmas)',
    href: 'https://gregobase.selapa.net/download.php?id=2058&format=gabc&elem=1',
  },
  {
    text: 'Apud Dominum misericordia',
    href: 'https://gregobase.selapa.net/download.php?id=2277&format=gabc&elem=1',
  },
  {
    text: 'De fructu ventris',
    href: 'https://gregobase.selapa.net/download.php?id=12235&format=gabc',
  },
  {
    text: 'Hodie Christus natus est',
    href: 'https://gregobase.selapa.net/download.php?id=12352&format=gabc&elem=1',
  },
  {
    text: 'De fructu ventris tui',
    href: 'https://gregobase.selapa.net/download.php?id=2766&format=gabc&elem=1',
  },
  {
    text: 'Hodie Christus natus est',
    href: 'https://gregobase.selapa.net/download.php?id=2486&format=gabc&elem=1',
  },
  {
    text: 'Lapidaverunt Stephanum',
    href: 'https://gregobase.selapa.net/download.php?id=13214&format=gabc&elem=1',
  },
  {
    text: 'Lapides torrentes illi',
    href: 'https://gregobase.selapa.net/download.php?id=13258&format=gabc',
  },
  {
    text: 'Lapidaverunt Stephanum',
    href: 'https://gregobase.selapa.net/download.php?id=1972&format=gabc&elem=1',
  },
  {
    text: 'Lapides torrentes',
    href: 'https://gregobase.selapa.net/download.php?id=2160&format=gabc&elem=1',
  },
  {
    text: 'Ecce video caelos',
    href: 'https://gregobase.selapa.net/download.php?id=12031&format=gabc&elem=1',
  },
  {
    text: 'Invicte Martyr unicum (Pro S. Stephano)',
    href: 'https://gregobase.selapa.net/download.php?id=12618&format=gabc',
  },
  {
    text: 'Adhaesit anima mea (S. Stephani)',
    href: 'https://gregobase.selapa.net/download.php?id=12868&format=gabc',
  },
  {
    text: 'Adhaesit anima (St. Stephani)',
    href: 'https://gregobase.selapa.net/download.php?id=2787&format=gabc&elem=1',
  },
  {
    text: 'Stephanus vidit',
    href: 'https://gregobase.selapa.net/download.php?id=2373&format=gabc&elem=1',
  },
  {
    text: 'Stephanus vidit caelos',
    href: 'https://gregobase.selapa.net/download.php?id=12786&format=gabc&elem=1',
  },
  {
    text: 'Ecce video caelos',
    href: 'https://gregobase.selapa.net/download.php?id=2048&format=gabc&elem=1',
  },
  {
    text: 'Stephanus autem plenus',
    href: 'https://gregobase.selapa.net/download.php?id=11999&format=gabc',
  },
  {
    text: 'Stephanus autem',
    href: 'https://gregobase.selapa.net/download.php?id=2825&format=gabc&elem=1',
  },
  {
    text: 'Deus tuorum militum (Pro S. Stephano)',
    href: 'https://gregobase.selapa.net/download.php?id=12802&format=gabc',
  },
  {
    text: 'Deus tuorum militum (St. Stephen)',
    href: 'https://gregobase.selapa.net/download.php?id=2126&format=gabc&elem=1',
  },
  {
    text: 'Sepelierunt Stephanum',
    href: 'https://gregobase.selapa.net/download.php?id=12259&format=gabc&elem=1',
  },
  {
    text: 'Sepelierunt Stephanum',
    href: 'https://gregobase.selapa.net/download.php?id=1962&format=gabc&elem=1',
  },
  {
    text: 'Valde honorandus est',
    href: 'https://gregobase.selapa.net/download.php?id=12302&format=gabc&elem=1',
  },
  {
    text: 'Hic est discipulus ille',
    href: 'https://gregobase.selapa.net/download.php?id=13071&format=gabc&elem=1',
  },
  {
    text: 'Hic est discipulus meus',
    href: 'https://gregobase.selapa.net/download.php?id=13331&format=gabc&elem=1',
  },
  {
    text: 'Valde honorandus est',
    href: 'https://gregobase.selapa.net/download.php?id=1906&format=gabc&elem=1',
  },
  {
    text: 'Hic est discipulus ille',
    href: 'https://gregobase.selapa.net/download.php?id=2569&format=gabc&elem=1',
  },
  {
    text: 'Hic est discipulus meus',
    href: 'https://gregobase.selapa.net/download.php?id=2499&format=gabc&elem=1',
  },
  {
    text: 'Sunt de hic stantibus',
    href: 'https://gregobase.selapa.net/download.php?id=13076&format=gabc',
  },
  {
    text: 'Exsultet orbis gaudiis (Pro S. Joanne Evang.)',
    href: 'https://gregobase.selapa.net/download.php?id=13254&format=gabc',
  },
  {
    text: 'Ecce puer meus',
    href: 'https://gregobase.selapa.net/download.php?id=2409&format=gabc&elem=1',
  },
  {
    text: 'Exsultet orbis gaudiis (St. John Evangelist)',
    href: 'https://gregobase.selapa.net/download.php?id=2191&format=gabc&elem=1',
  },
  {
    text: 'Iste est Joannes',
    href: 'https://gregobase.selapa.net/download.php?id=13223&format=gabc&elem=1',
  },
  {
    text: 'Iste est Joannes',
    href: 'https://gregobase.selapa.net/download.php?id=2174&format=gabc&elem=1',
  },
  {
    text: 'Herodes iratus',
    href: 'https://gregobase.selapa.net/download.php?id=12898&format=gabc',
  },
  {
    text: 'Exiit sermo',
    href: 'https://gregobase.selapa.net/download.php?id=2471&format=gabc&elem=1',
  },
  {
    text: 'Exiit sermo inter',
    href: 'https://gregobase.selapa.net/download.php?id=12361&format=gabc&elem=1',
  },
  {
    text: 'A bimatu et infra',
    href: 'https://gregobase.selapa.net/download.php?id=11875&format=gabc&elem=1',
  },
  {
    text: 'Sub throno Dei',
    href: 'https://gregobase.selapa.net/download.php?id=12459&format=gabc&elem=1',
  },
  {
    text: 'Vox in Rama',
    href: 'https://gregobase.selapa.net/download.php?id=12471&format=gabc',
  },
  {
    text: 'Angeli eorum ... Patris',
    href: 'https://gregobase.selapa.net/download.php?id=12872&format=gabc',
  },
  {
    text: 'A bimatu et infra',
    href: 'https://gregobase.selapa.net/download.php?id=1879&format=gabc&elem=1',
  },
  {
    text: 'Angeli eorum... Patris',
    href: 'https://gregobase.selapa.net/download.php?id=2703&format=gabc&elem=1',
  },
  {
    text: 'Sub throno Dei',
    href: 'https://gregobase.selapa.net/download.php?id=2939&format=gabc&elem=1',
  },
  {
    text: 'Salvete flores Martyrum',
    href: 'https://gregobase.selapa.net/download.php?id=13249&format=gabc&elem=1',
  },
  {
    text: 'Salvete flores Martyrum',
    href: 'https://gregobase.selapa.net/download.php?id=1963&format=gabc&elem=1',
  },
  {
    text: 'Hi sunt qui cum mulieribus',
    href: 'https://gregobase.selapa.net/download.php?id=2548&format=gabc&elem=1',
  },
  {
    text: 'Innocentes pro Christo',
    href: 'https://gregobase.selapa.net/download.php?id=12601&format=gabc&elem=1',
  },
  {
    text: 'Innocentes pro Christo',
    href: 'https://gregobase.selapa.net/download.php?id=2833&format=gabc&elem=1',
  },
  {
    text: 'Dum medium silentium',
    href: 'https://gregobase.selapa.net/download.php?id=13280&format=gabc&elem=1',
  },
  {
    text: 'Dum medium silentium',
    href: 'https://gregobase.selapa.net/download.php?id=2544&format=gabc&elem=1',
  },
  {
    text: 'Puer Jesus proficiebat',
    href: 'https://gregobase.selapa.net/download.php?id=13006&format=gabc',
  },
  {
    text: 'Puer Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=2178&format=gabc&elem=1',
  },
  {
    text: 'Jesu Redemptor omnium (Pont.) (Pro S. Silvestro)',
    href: 'https://gregobase.selapa.net/download.php?id=12971&format=gabc',
  },
  {
    text: 'Propter nimiam caritatem',
    href: 'https://gregobase.selapa.net/download.php?id=13051&format=gabc',
  },
  {
    text: 'Propter nimiam',
    href: 'https://gregobase.selapa.net/download.php?id=2010&format=gabc&elem=1',
  },
  {
    text: 'Quando natus es',
    href: 'https://gregobase.selapa.net/download.php?id=11823&format=gabc&elem=1',
  },
  {
    text: 'O admirabile commercium',
    href: 'https://gregobase.selapa.net/download.php?id=13327&format=gabc&elem=1',
  },
  {
    text: 'O admirabile commercium',
    href: 'https://gregobase.selapa.net/download.php?id=2008&format=gabc&elem=1',
  },
  {
    text: 'Quando natus es',
    href: 'https://gregobase.selapa.net/download.php?id=2973&format=gabc&elem=1',
  },
  {
    text: 'Rubum quem viderat',
    href: 'https://gregobase.selapa.net/download.php?id=12104&format=gabc',
  },
  {
    text: 'Ecce Maria genuit',
    href: 'https://gregobase.selapa.net/download.php?id=12519&format=gabc',
  },
  {
    text: 'Germinavit radix',
    href: 'https://gregobase.selapa.net/download.php?id=13207&format=gabc&elem=1',
  },
  {
    text: 'Rubum quem',
    href: 'https://gregobase.selapa.net/download.php?id=1903&format=gabc&elem=1',
  },
  {
    text: 'Germinavit radix',
    href: 'https://gregobase.selapa.net/download.php?id=2195&format=gabc&elem=1',
  },
  {
    text: 'Mirabile mysterium',
    href: 'https://gregobase.selapa.net/download.php?id=13319&format=gabc',
  },
  {
    text: 'Magnum haereditatis',
    href: 'https://gregobase.selapa.net/download.php?id=12622&format=gabc&elem=1',
  },
  {
    text: 'Magnum haereditatis',
    href: 'https://gregobase.selapa.net/download.php?id=2916&format=gabc&elem=1',
  },
  {
    text: 'Omnis qui invocaverit',
    href: 'https://gregobase.selapa.net/download.php?id=12121&format=gabc',
  },
  {
    text: 'Sanctum et terribile',
    href: 'https://gregobase.selapa.net/download.php?id=12203&format=gabc&elem=1',
  },
  {
    text: 'Sanctum et terribile',
    href: 'https://gregobase.selapa.net/download.php?id=2775&format=gabc&elem=1',
  },
  {
    text: 'A solis ortu',
    href: 'https://gregobase.selapa.net/download.php?id=12484&format=gabc&elem=1',
  },
  {
    text: 'Ego autem in Domino',
    href: 'https://gregobase.selapa.net/download.php?id=12934&format=gabc&elem=1',
  },
  {
    text: 'Sacrificabo hostiam',
    href: 'https://gregobase.selapa.net/download.php?id=13108&format=gabc&elem=1',
  },
  {
    text: 'Ego autem in Domino',
    href: 'https://gregobase.selapa.net/download.php?id=2795&format=gabc&elem=1',
  },
  {
    text: 'A solis ortu',
    href: 'https://gregobase.selapa.net/download.php?id=2925&format=gabc&elem=1',
  },
  {
    text: 'Sacrificabo hostiam',
    href: 'https://gregobase.selapa.net/download.php?id=2213&format=gabc&elem=1',
  },
  {
    text: 'Jesu dulcis memoria',
    href: 'https://gregobase.selapa.net/download.php?id=13299&format=gabc&elem=1',
  },
  {
    text: 'Jesu dulcis memoria',
    href: 'https://gregobase.selapa.net/download.php?id=1911&format=gabc&elem=1',
  },
  {
    text: 'Fecit mihi magna',
    href: 'https://gregobase.selapa.net/download.php?id=11826&format=gabc&elem=1',
  },
  {
    text: 'Scitote quia Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12378&format=gabc&elem=1',
  },
  {
    text: 'Oleum effusum nomen',
    href: 'https://gregobase.selapa.net/download.php?id=12918&format=gabc',
  },
  {
    text: 'Fecit mihi magna',
    href: 'https://gregobase.selapa.net/download.php?id=2618&format=gabc&elem=1',
  },
  {
    text: 'Oleum effusum',
    href: 'https://gregobase.selapa.net/download.php?id=2465&format=gabc&elem=1',
  },
  {
    text: 'Scitote quia Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2762&format=gabc&elem=1',
  },
  {
    text: 'Jesu decus angelicum',
    href: 'https://gregobase.selapa.net/download.php?id=11869&format=gabc',
  },
  {
    text: 'Sitivit anima mea',
    href: 'https://gregobase.selapa.net/download.php?id=12722&format=gabc',
  },
  {
    text: 'Juvenes et virgines',
    href: 'https://gregobase.selapa.net/download.php?id=12939&format=gabc&elem=1',
  },
  {
    text: 'Benedictum nomen',
    href: 'https://gregobase.selapa.net/download.php?id=13237&format=gabc',
  },
  {
    text: 'Sitivit... ad nomen',
    href: 'https://gregobase.selapa.net/download.php?id=2055&format=gabc&elem=1',
  },
  {
    text: 'Juvenes et virgines',
    href: 'https://gregobase.selapa.net/download.php?id=2144&format=gabc&elem=1',
  },
  {
    text: 'Dedit se ut liberaret',
    href: 'https://gregobase.selapa.net/download.php?id=13137&format=gabc',
  },
  {
    text: 'Sit nomen',
    href: 'https://gregobase.selapa.net/download.php?id=3092&format=gabc&elem=1',
  },
  {
    text: 'Sit nomen Domini benedictum',
    href: 'https://gregobase.selapa.net/download.php?id=12595&format=gabc',
  },
  {
    text: 'Afferte Domino gloriam',
    href: 'https://gregobase.selapa.net/download.php?id=12630&format=gabc&elem=1',
  },
  {
    text: 'Magnificate Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=13022&format=gabc&elem=1',
  },
  {
    text: 'Afferte Domino gloriam',
    href: 'https://gregobase.selapa.net/download.php?id=3201&format=gabc&elem=1',
  },
  {
    text: 'Magnificate Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=3191&format=gabc&elem=1',
  },
  {
    text: 'Vocabis nomen ejus',
    href: 'https://gregobase.selapa.net/download.php?id=13120&format=gabc&elem=1',
  },
  {
    text: 'Vocabis nomen ejus',
    href: 'https://gregobase.selapa.net/download.php?id=2547&format=gabc&elem=1',
  },
  {
    text: 'Crudelis Herodes',
    href: 'https://gregobase.selapa.net/download.php?id=11942&format=gabc',
  },
  {
    text: 'Crudelis Herodes Deum (another download)',
    href: 'https://gregobase.selapa.net/download.php?id=1825&format=gabc&elem=1',
  },
  {
    text: 'Crudelis Herodes (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=12846&format=gabc&elem=1',
  },
  {
    text: 'Magi videntes stellam',
    href: 'https://gregobase.selapa.net/download.php?id=11814&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Epiphania)',
    href: 'https://gregobase.selapa.net/download.php?id=12897&format=gabc',
  },
  {
    text: 'Magi videntes stellam',
    href: 'https://gregobase.selapa.net/download.php?id=2368&format=gabc&elem=1',
  },
  {
    text: 'Ante luciferum genitus',
    href: 'https://gregobase.selapa.net/download.php?id=12240&format=gabc',
  },
  {
    text: 'Venit lumen tuum',
    href: 'https://gregobase.selapa.net/download.php?id=12573&format=gabc&elem=1',
  },
  {
    text: 'Venit lumen tuum',
    href: 'https://gregobase.selapa.net/download.php?id=2692&format=gabc&elem=1',
  },
  {
    text: 'Apertis thesauris suis',
    href: 'https://gregobase.selapa.net/download.php?id=11991&format=gabc',
  },
  {
    text: 'Maria et flumina',
    href: 'https://gregobase.selapa.net/download.php?id=12350&format=gabc&elem=1',
  },
  {
    text: 'Stella ista sicut flamma',
    href: 'https://gregobase.selapa.net/download.php?id=12816&format=gabc',
  },
  {
    text: 'O sola magnarum',
    href: 'https://gregobase.selapa.net/download.php?id=13043&format=gabc',
  },
  {
    text: 'Apertis thesauris',
    href: 'https://gregobase.selapa.net/download.php?id=2464&format=gabc&elem=1',
  },
  {
    text: 'Maria et flumina',
    href: 'https://gregobase.selapa.net/download.php?id=2004&format=gabc&elem=1',
  },
  {
    text: 'Stella ista',
    href: 'https://gregobase.selapa.net/download.php?id=1968&format=gabc&elem=1',
  },
  {
    text: 'Hodie caelesti sponso',
    href: 'https://gregobase.selapa.net/download.php?id=12310&format=gabc&elem=1',
  },
  {
    text: 'Hodie caelesti sponso',
    href: 'https://gregobase.selapa.net/download.php?id=2382&format=gabc&elem=1',
  },
  {
    text: 'Reges Tharsis',
    href: 'https://gregobase.selapa.net/download.php?id=12533&format=gabc&elem=1',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (In Epiphania)',
    href: 'https://gregobase.selapa.net/download.php?id=12927&format=gabc',
  },
  {
    text: 'Reges Tharsis',
    href: 'https://gregobase.selapa.net/download.php?id=3083&format=gabc&elem=1',
  },
  {
    text: 'Adorate Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=12947&format=gabc&elem=1',
  },
  {
    text: 'Omnes de Saba',
    href: 'https://gregobase.selapa.net/download.php?id=13211&format=gabc&elem=1',
  },
  {
    text: 'Omnes de Saba',
    href: 'https://gregobase.selapa.net/download.php?id=3161&format=gabc&elem=1',
  },
  {
    text: 'Adorate Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=3206&format=gabc&elem=1',
  },
  {
    text: 'Tribus miraculis',
    href: 'https://gregobase.selapa.net/download.php?id=11762&format=gabc&elem=1',
  },
  {
    text: 'Tribus miraculis',
    href: 'https://gregobase.selapa.net/download.php?id=2199&format=gabc&elem=1',
  },
  {
    text: 'Jacob autem genuit',
    href: 'https://gregobase.selapa.net/download.php?id=12216&format=gabc&elem=1',
  },
  {
    text: 'Jacob autem genuit',
    href: 'https://gregobase.selapa.net/download.php?id=12803&format=gabc&elem=1',
  },
  {
    text: 'Jacob autem genuit',
    href: 'https://gregobase.selapa.net/download.php?id=2663&format=gabc&elem=1',
  },
  {
    text: 'Magi intrantes domum',
    href: 'https://gregobase.selapa.net/download.php?id=12256&format=gabc',
  },
  {
    text: 'Pastores venerunt',
    href: 'https://gregobase.selapa.net/download.php?id=13033&format=gabc',
  },
  {
    text: 'Angelus Domini apparuit in somnis',
    href: 'https://gregobase.selapa.net/download.php?id=1834&format=gabc&elem=1',
  },
  {
    text: 'Angelus Domini apparuit',
    href: 'https://gregobase.selapa.net/download.php?id=12078&format=gabc&elem=1',
  },
  {
    text: 'Pastores venerunt',
    href: 'https://gregobase.selapa.net/download.php?id=2697&format=gabc',
  },
  {
    text: 'Magi intrantes',
    href: 'https://gregobase.selapa.net/download.php?id=2446&format=gabc&elem=1',
  },
  {
    text: 'Erat Pater ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12498&format=gabc',
  },
  {
    text: 'O lux beata Caelitum',
    href: 'https://gregobase.selapa.net/download.php?id=13131&format=gabc&elem=1',
  },
  {
    text: 'Erat pater ejus',
    href: 'https://gregobase.selapa.net/download.php?id=2398&format=gabc&elem=1',
  },
  {
    text: 'O lux beata Caelitum',
    href: 'https://gregobase.selapa.net/download.php?id=2224&format=gabc&elem=1',
  },
  {
    text: 'Remansit puer Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=12281&format=gabc',
  },
  {
    text: 'Verbum caro',
    href: 'https://gregobase.selapa.net/download.php?id=13213&format=gabc',
  },
  {
    text: 'Verbum caro factum est',
    href: 'https://gregobase.selapa.net/download.php?id=2110&format=gabc&elem=1',
  },
  {
    text: 'Remansit puer',
    href: 'https://gregobase.selapa.net/download.php?id=2342&format=gabc&elem=1',
  },
  {
    text: 'Dixit Mater Jesu ad illum',
    href: 'https://gregobase.selapa.net/download.php?id=13236&format=gabc&elem=1',
  },
  {
    text: 'Post triduum',
    href: 'https://gregobase.selapa.net/download.php?id=1856&format=gabc&elem=1',
  },
  {
    text: 'Post triduum',
    href: 'https://gregobase.selapa.net/download.php?id=11822&format=gabc&elem=1',
  },
  {
    text: 'Dixit Mater Jesu ad illum',
    href: 'https://gregobase.selapa.net/download.php?id=2962&format=gabc&elem=1',
  },
  {
    text: 'Et Jesus proficiebat',
    href: 'https://gregobase.selapa.net/download.php?id=12321&format=gabc',
  },
  {
    text: 'O gente felix hospita',
    href: 'https://gregobase.selapa.net/download.php?id=12700&format=gabc',
  },
  {
    text: 'Et dicebant unde',
    href: 'https://gregobase.selapa.net/download.php?id=12885&format=gabc',
  },
  {
    text: 'Descendit Jesus cum eis',
    href: 'https://gregobase.selapa.net/download.php?id=12929&format=gabc',
  },
  {
    text: 'Descendit Jesus cum eis',
    href: 'https://gregobase.selapa.net/download.php?id=13023&format=gabc',
  },
  {
    text: 'Descendit Jesus cum eis (Ant.)',
    href: 'https://gregobase.selapa.net/download.php?id=2147&format=gabc&elem=1',
  },
  {
    text: 'Et dicebant',
    href: 'https://gregobase.selapa.net/download.php?id=2874&format=gabc&elem=1',
  },
  {
    text: 'Illumina nos Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12193&format=gabc',
  },
  {
    text: 'Propter nos egenus factus est',
    href: 'https://gregobase.selapa.net/download.php?id=12336&format=gabc',
  },
  {
    text: 'Dominus vias suas',
    href: 'https://gregobase.selapa.net/download.php?id=13264&format=gabc',
  },
  {
    text: 'Propter nos',
    href: 'https://gregobase.selapa.net/download.php?id=3109&format=gabc&elem=1',
  },
  {
    text: 'Maria autem',
    href: 'https://gregobase.selapa.net/download.php?id=11797&format=gabc&elem=1',
  },
  {
    text: 'Pauper sum ego',
    href: 'https://gregobase.selapa.net/download.php?id=12132&format=gabc',
  },
  {
    text: 'Maria autem',
    href: 'https://gregobase.selapa.net/download.php?id=2824&format=gabc&elem=1',
  },
  {
    text: 'Fili quid fecisti',
    href: 'https://gregobase.selapa.net/download.php?id=12808&format=gabc&elem=1',
  },
  {
    text: 'Fili quid fecisti',
    href: 'https://gregobase.selapa.net/download.php?id=2418&format=gabc&elem=1',
  },
  {
    text: 'Ab Oriente venerunt',
    href: 'https://gregobase.selapa.net/download.php?id=12046&format=gabc',
  },
  {
    text: 'Videntes stellam',
    href: 'https://gregobase.selapa.net/download.php?id=2817&format=gabc&elem=1',
  },
  {
    text: 'Videntes stellam',
    href: 'https://gregobase.selapa.net/download.php?id=13187&format=gabc&elem=1',
  },
  {
    text: 'Vidimus stellam ejus',
    href: 'https://gregobase.selapa.net/download.php?id=11894&format=gabc',
  },
  {
    text: 'Tria sunt munera',
    href: 'https://gregobase.selapa.net/download.php?id=11912&format=gabc',
  },
  {
    text: 'Lux de luce',
    href: 'https://gregobase.selapa.net/download.php?id=12775&format=gabc&elem=1',
  },
  {
    text: 'Lux de luce',
    href: 'https://gregobase.selapa.net/download.php?id=1881&format=gabc&elem=1',
  },
  {
    text: 'Omnes nationes',
    href: 'https://gregobase.selapa.net/download.php?id=11887&format=gabc',
  },
  {
    text: 'Interrogabat Magos',
    href: 'https://gregobase.selapa.net/download.php?id=12347&format=gabc',
  },
  {
    text: 'Omnes de Saba',
    href: 'https://gregobase.selapa.net/download.php?id=12876&format=gabc&elem=1',
  },
  {
    text: 'Interrogabat magos',
    href: 'https://gregobase.selapa.net/download.php?id=2812&format=gabc&elem=1',
  },
  {
    text: 'Omnes de Saba',
    href: 'https://gregobase.selapa.net/download.php?id=2944&format=gabc&elem=1',
  },
  {
    text: 'Iste Sanctus pro lege',
    href: 'https://gregobase.selapa.net/download.php?id=11741&format=gabc',
  },
  {
    text: 'Iste Sanctus pro lege',
    href: 'https://gregobase.selapa.net/download.php?id=11743&format=gabc',
  },
  {
    text: 'Venient ad te',
    href: 'https://gregobase.selapa.net/download.php?id=11968&format=gabc',
  },
  {
    text: 'Admoniti Magi',
    href: 'https://gregobase.selapa.net/download.php?id=12831&format=gabc&elem=1',
  },
  {
    text: 'Iste Sanctus pro lege',
    href: 'https://gregobase.selapa.net/download.php?id=13158&format=gabc',
  },
  {
    text: 'Admoniti Magi',
    href: 'https://gregobase.selapa.net/download.php?id=1960&format=gabc&elem=1',
  },
  {
    text: 'Manifeste magnum est',
    href: 'https://gregobase.selapa.net/download.php?id=13285&format=gabc',
  },
  {
    text: 'Deficiente vino',
    href: 'https://gregobase.selapa.net/download.php?id=12320&format=gabc&elem=1',
  },
  {
    text: 'Nuptiae factae sunt',
    href: 'https://gregobase.selapa.net/download.php?id=13041&format=gabc',
  },
  {
    text: 'Deficiente vino',
    href: 'https://gregobase.selapa.net/download.php?id=2205&format=gabc&elem=1',
  },
  {
    text: 'Cum autem descendisset',
    href: 'https://gregobase.selapa.net/download.php?id=12334&format=gabc',
  },
  {
    text: 'Domine si tu vis',
    href: 'https://gregobase.selapa.net/download.php?id=12482&format=gabc&elem=1',
  },
  {
    text: 'Cum autem',
    href: 'https://gregobase.selapa.net/download.php?id=2073&format=gabc&elem=1',
  },
  {
    text: 'Domine si tu vis',
    href: 'https://gregobase.selapa.net/download.php?id=2453&format=gabc&elem=1',
  },
  {
    text: 'Domine salva nos',
    href: 'https://gregobase.selapa.net/download.php?id=11779&format=gabc&elem=1',
  },
  {
    text: 'Ascendente Jesu',
    href: 'https://gregobase.selapa.net/download.php?id=12806&format=gabc&elem=1',
  },
  {
    text: 'Ascendente Jesu',
    href: 'https://gregobase.selapa.net/download.php?id=2059&format=gabc&elem=1',
  },
  {
    text: 'Domine salva nos',
    href: 'https://gregobase.selapa.net/download.php?id=2333&format=gabc&elem=1',
  },
  {
    text: 'Domine nonne bonum',
    href: 'https://gregobase.selapa.net/download.php?id=12559&format=gabc',
  },
  {
    text: 'Domine nonne',
    href: 'https://gregobase.selapa.net/download.php?id=2521&format=gabc&elem=1',
  },
  {
    text: 'Colligite primum',
    href: 'https://gregobase.selapa.net/download.php?id=1838&format=gabc&elem=1',
  },
  {
    text: 'Colligite primum',
    href: 'https://gregobase.selapa.net/download.php?id=12529&format=gabc&elem=1',
  },
  {
    text: 'Simile est ... grano',
    href: 'https://gregobase.selapa.net/download.php?id=12380&format=gabc',
  },
  {
    text: 'Simile est ... fermento',
    href: 'https://gregobase.selapa.net/download.php?id=12537&format=gabc',
  },
  {
    text: 'Simile est... grano',
    href: 'https://gregobase.selapa.net/download.php?id=2909&format=gabc&elem=1',
  },
  {
    text: 'Simile est... fermento',
    href: 'https://gregobase.selapa.net/download.php?id=2149&format=gabc&elem=1',
  },
  {
    text: 'Miserere mei Deus et a',
    href: 'https://gregobase.selapa.net/download.php?id=13183&format=gabc',
  },
  {
    text: 'Dixit Dominus ad Adam',
    href: 'https://gregobase.selapa.net/download.php?id=13240&format=gabc&elem=1',
  },
  {
    text: 'Dixit Dominus ad Adam',
    href: 'https://gregobase.selapa.net/download.php?id=2806&format=gabc&elem=1',
  },
  {
    text: 'Confitebor tibi Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12211&format=gabc',
  },
  {
    text: 'Benedictus es in firmamento',
    href: 'https://gregobase.selapa.net/download.php?id=12272&format=gabc',
  },
  {
    text: 'Deus Deus meus',
    href: 'https://gregobase.selapa.net/download.php?id=12711&format=gabc',
  },
  {
    text: 'Laudate Dominum de caelis',
    href: 'https://gregobase.selapa.net/download.php?id=18347&format=gabc',
  },
  {
    text: 'Conventione autem',
    href: 'https://gregobase.selapa.net/download.php?id=12294&format=gabc&elem=1',
  },
  {
    text: 'Simile est ... homini patrifamilias',
    href: 'https://gregobase.selapa.net/download.php?id=12720&format=gabc',
  },
  {
    text: 'Conventione autem',
    href: 'https://gregobase.selapa.net/download.php?id=2772&format=gabc&elem=1',
  },
  {
    text: 'Ite et vos in vineam',
    href: 'https://gregobase.selapa.net/download.php?id=12465&format=gabc',
  },
  {
    text: 'Quid hic statis',
    href: 'https://gregobase.selapa.net/download.php?id=12768&format=gabc&elem=1',
  },
  {
    text: 'Voca operarios',
    href: 'https://gregobase.selapa.net/download.php?id=12901&format=gabc&elem=1',
  },
  {
    text: 'Ite et vos',
    href: 'https://gregobase.selapa.net/download.php?id=2735&format=gabc&elem=1',
  },
  {
    text: 'Quid hic statis',
    href: 'https://gregobase.selapa.net/download.php?id=2429&format=gabc&elem=1',
  },
  {
    text: 'Voca operarios',
    href: 'https://gregobase.selapa.net/download.php?id=1898&format=gabc&elem=1',
  },
  {
    text: 'Dixit paterfamilias',
    href: 'https://gregobase.selapa.net/download.php?id=11729&format=gabc&elem=1',
  },
  {
    text: 'Hi novissimi',
    href: 'https://gregobase.selapa.net/download.php?id=12912&format=gabc',
  },
  {
    text: 'Dixit autem paterfamilias',
    href: 'https://gregobase.selapa.net/download.php?id=12467&format=gabc',
  },
  {
    text: 'Tolle quod tuum est',
    href: 'https://gregobase.selapa.net/download.php?id=12307&format=gabc',
  },
  {
    text: 'Dixit Dominus ad Noe',
    href: 'https://gregobase.selapa.net/download.php?id=12582&format=gabc&elem=1',
  },
  {
    text: 'Non licet mihi',
    href: 'https://gregobase.selapa.net/download.php?id=13208&format=gabc',
  },
  {
    text: 'Dixit Dominus ad Noe',
    href: 'https://gregobase.selapa.net/download.php?id=2876&format=gabc&elem=1',
  },
  {
    text: 'Si mihi Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=11943&format=gabc',
  },
  {
    text: 'Secundum magnam',
    href: 'https://gregobase.selapa.net/download.php?id=12343&format=gabc',
  },
  {
    text: 'In velamento clamavi',
    href: 'https://gregobase.selapa.net/download.php?id=13090&format=gabc',
  },
  {
    text: 'In excelsis laudate',
    href: 'https://gregobase.selapa.net/download.php?id=12620&format=gabc',
  },
  {
    text: 'Hymnum dicamus',
    href: 'https://gregobase.selapa.net/download.php?id=12703&format=gabc',
  },
  {
    text: 'Cum turba plurima',
    href: 'https://gregobase.selapa.net/download.php?id=13161&format=gabc',
  },
  {
    text: 'Semen cecidit ... aliud',
    href: 'https://gregobase.selapa.net/download.php?id=12138&format=gabc',
  },
  {
    text: 'Qui verbum Dei retinent',
    href: 'https://gregobase.selapa.net/download.php?id=12713&format=gabc&elem=1',
  },
  {
    text: 'Semen cecidit... in patientia',
    href: 'https://gregobase.selapa.net/download.php?id=1855&format=gabc&elem=1',
  },
  {
    text: 'Semen cecidit... in patientia',
    href: 'https://gregobase.selapa.net/download.php?id=12061&format=gabc&elem=1',
  },
  {
    text: 'Qui verbum Dei retinent',
    href: 'https://gregobase.selapa.net/download.php?id=2264&format=gabc&elem=1',
  },
  {
    text: 'Semen cecidit... aliud',
    href: 'https://gregobase.selapa.net/download.php?id=2097&format=gabc&elem=1',
  },
  {
    text: 'Si vere fratres',
    href: 'https://gregobase.selapa.net/download.php?id=12148&format=gabc&elem=1',
  },
  {
    text: 'Vobis datum est nosse',
    href: 'https://gregobase.selapa.net/download.php?id=12254&format=gabc',
  },
  {
    text: 'Si vere fratres',
    href: 'https://gregobase.selapa.net/download.php?id=2438&format=gabc&elem=1',
  },
  {
    text: 'Vobis datum est',
    href: 'https://gregobase.selapa.net/download.php?id=1883&format=gabc&elem=1',
  },
  {
    text: 'Si culmen',
    href: 'https://gregobase.selapa.net/download.php?id=12005&format=gabc',
  },
  {
    text: 'Quod autem',
    href: 'https://gregobase.selapa.net/download.php?id=13079&format=gabc',
  },
  {
    text: 'Semen est',
    href: 'https://gregobase.selapa.net/download.php?id=13123&format=gabc',
  },
  {
    text: 'Pater fidei nostrae',
    href: 'https://gregobase.selapa.net/download.php?id=12739&format=gabc&elem=1',
  },
  {
    text: 'Secundum multitudinem',
    href: 'https://gregobase.selapa.net/download.php?id=13020&format=gabc',
  },
  {
    text: 'Pater fidei nostrae',
    href: 'https://gregobase.selapa.net/download.php?id=2276&format=gabc&elem=1',
  },
  {
    text: 'Deus meus es tu',
    href: 'https://gregobase.selapa.net/download.php?id=12246&format=gabc',
  },
  {
    text: 'Omnes Angeli ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12542&format=gabc',
  },
  {
    text: 'Hymnum dicite',
    href: 'https://gregobase.selapa.net/download.php?id=13031&format=gabc',
  },
  {
    text: 'Ad te de luce',
    href: 'https://gregobase.selapa.net/download.php?id=13162&format=gabc',
  },
  {
    text: 'Ecce ascendimus... et consummabuntur',
    href: 'https://gregobase.selapa.net/download.php?id=12650&format=gabc',
  },
  {
    text: 'Iter faciente Jesu',
    href: 'https://gregobase.selapa.net/download.php?id=13234&format=gabc&elem=1',
  },
  {
    text: 'Iter faciente Jesu',
    href: 'https://gregobase.selapa.net/download.php?id=1974&format=gabc&elem=1',
  },
  {
    text: 'Et qui praeibant',
    href: 'https://gregobase.selapa.net/download.php?id=12603&format=gabc&elem=1',
  },
  {
    text: 'Transeunte Domino',
    href: 'https://gregobase.selapa.net/download.php?id=13222&format=gabc&elem=1',
  },
  {
    text: 'Transeunte Domino',
    href: 'https://gregobase.selapa.net/download.php?id=2365&format=gabc&elem=1',
  },
  {
    text: 'Et qui praeibant',
    href: 'https://gregobase.selapa.net/download.php?id=2361&format=gabc&elem=1',
  },
  {
    text: 'Caecus magis ac magis',
    href: 'https://gregobase.selapa.net/download.php?id=11733&format=gabc',
  },
  {
    text: 'Caecus magis',
    href: 'https://gregobase.selapa.net/download.php?id=2258&format=gabc&elem=1',
  },
  {
    text: 'Stans autem Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=2369&format=gabc&elem=1',
  },
  {
    text: 'Stans autem Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=13036&format=gabc&elem=1',
  },
  {
    text: 'Miserere mei Fili',
    href: 'https://gregobase.selapa.net/download.php?id=12841&format=gabc&elem=1',
  },
  {
    text: 'Miserere mei Fili',
    href: 'https://gregobase.selapa.net/download.php?id=2780&format=gabc&elem=1',
  },
  {
    text: 'Cum jejunatis',
    href: 'https://gregobase.selapa.net/download.php?id=12032&format=gabc',
  },
  {
    text: 'Thesaurizate vobis',
    href: 'https://gregobase.selapa.net/download.php?id=12860&format=gabc',
  },
  {
    text: 'Domine puer meus',
    href: 'https://gregobase.selapa.net/download.php?id=12670&format=gabc',
  },
  {
    text: 'Domine non sum dignus',
    href: 'https://gregobase.selapa.net/download.php?id=13044&format=gabc',
  },
  {
    text: 'Me etenim de die',
    href: 'https://gregobase.selapa.net/download.php?id=12180&format=gabc',
  },
  {
    text: 'Cum facis eleemosynam',
    href: 'https://gregobase.selapa.net/download.php?id=12736&format=gabc',
  },
  {
    text: 'Tu autem cum oraveris',
    href: 'https://gregobase.selapa.net/download.php?id=13304&format=gabc',
  },
  {
    text: 'Audi benigne Conditor',
    href: 'https://gregobase.selapa.net/download.php?id=1830&format=gabc&elem=1',
  },
  {
    text: 'Audi benigne Conditor',
    href: 'https://gregobase.selapa.net/download.php?id=12643&format=gabc&elem=1',
  },
  {
    text: 'Tunc invocabis',
    href: 'https://gregobase.selapa.net/download.php?id=12488&format=gabc&elem=1',
  },
  {
    text: 'Tunc invocabis',
    href: 'https://gregobase.selapa.net/download.php?id=2119&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Quadragesima)',
    href: 'https://gregobase.selapa.net/download.php?id=12673&format=gabc',
  },
  {
    text: 'Te lucis ante terminum (Lent)',
    href: 'https://gregobase.selapa.net/download.php?id=2310&format=gabc&elem=1',
  },
  {
    text: 'In spiritu humilitatis',
    href: 'https://gregobase.selapa.net/download.php?id=11966&format=gabc',
  },
  {
    text: 'Cor mundum crea',
    href: 'https://gregobase.selapa.net/download.php?id=11969&format=gabc',
  },
  {
    text: 'Sic benedicam te',
    href: 'https://gregobase.selapa.net/download.php?id=12001&format=gabc',
  },
  {
    text: 'O Domine salvum me',
    href: 'https://gregobase.selapa.net/download.php?id=12188&format=gabc',
  },
  {
    text: 'Laudate Deum caeli',
    href: 'https://gregobase.selapa.net/download.php?id=11734&format=gabc',
  },
  {
    text: 'O sol salutis intimis',
    href: 'https://gregobase.selapa.net/download.php?id=12159&format=gabc',
  },
  {
    text: 'O sol salutis intimis (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=12937&format=gabc',
  },
  {
    text: 'Ductus est Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=11900&format=gabc',
  },
  {
    text: 'Jesus autem cum jejunasset',
    href: 'https://gregobase.selapa.net/download.php?id=12576&format=gabc',
  },
  {
    text: 'Jesus autem cum',
    href: 'https://gregobase.selapa.net/download.php?id=2549&format=gabc&elem=1',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (In Quadragesima)',
    href: 'https://gregobase.selapa.net/download.php?id=12149&format=gabc',
  },
  {
    text: 'Tunc assumpsit eum',
    href: 'https://gregobase.selapa.net/download.php?id=12995&format=gabc&elem=1',
  },
  {
    text: 'Tunc assumpsit eum',
    href: 'https://gregobase.selapa.net/download.php?id=2506&format=gabc&elem=1',
  },
  {
    text: 'Non in solo pane',
    href: 'https://gregobase.selapa.net/download.php?id=12155&format=gabc&elem=1',
  },
  {
    text: 'Dominum Deum tuum',
    href: 'https://gregobase.selapa.net/download.php?id=13073&format=gabc',
  },
  {
    text: 'Non in solo pane',
    href: 'https://gregobase.selapa.net/download.php?id=2573&format=gabc&elem=1',
  },
  {
    text: 'Dominum Deum',
    href: 'https://gregobase.selapa.net/download.php?id=2799&format=gabc&elem=1',
  },
  {
    text: 'Ecce nunc tempus',
    href: 'https://gregobase.selapa.net/download.php?id=13182&format=gabc&elem=1',
  },
  {
    text: 'Ecce nunc tempus',
    href: 'https://gregobase.selapa.net/download.php?id=2399&format=gabc&elem=1',
  },
  {
    text: 'Quod uni ex minimis',
    href: 'https://gregobase.selapa.net/download.php?id=11778&format=gabc',
  },
  {
    text: 'Venite benedicti',
    href: 'https://gregobase.selapa.net/download.php?id=11877&format=gabc',
  },
  {
    text: 'Scriptum est enim quia',
    href: 'https://gregobase.selapa.net/download.php?id=12990&format=gabc&elem=1',
  },
  {
    text: 'Intravit Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=13318&format=gabc',
  },
  {
    text: 'Generatio haec prava',
    href: 'https://gregobase.selapa.net/download.php?id=12492&format=gabc',
  },
  {
    text: 'Sicut fuit Jonas',
    href: 'https://gregobase.selapa.net/download.php?id=12734&format=gabc',
  },
  {
    text: 'Egressus Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=12575&format=gabc',
  },
  {
    text: 'Angelus Domini descendebat',
    href: 'https://gregobase.selapa.net/download.php?id=11905&format=gabc&elem=1',
  },
  {
    text: 'O mulier magna est',
    href: 'https://gregobase.selapa.net/download.php?id=12345&format=gabc',
  },
  {
    text: 'Qui me sanum fecit',
    href: 'https://gregobase.selapa.net/download.php?id=13273&format=gabc&elem=1',
  },
  {
    text: 'O mulier',
    href: 'https://gregobase.selapa.net/download.php?id=2385&format=gabc&elem=1',
  },
  {
    text: 'Angelus Domini descendebat',
    href: 'https://gregobase.selapa.net/download.php?id=2045&format=gabc&elem=1',
  },
  {
    text: 'Qui me sanum fecit',
    href: 'https://gregobase.selapa.net/download.php?id=2543&format=gabc&elem=1',
  },
  {
    text: 'Domine labia mea',
    href: 'https://gregobase.selapa.net/download.php?id=12862&format=gabc',
  },
  {
    text: 'Visionem quam vidistis',
    href: 'https://gregobase.selapa.net/download.php?id=13336&format=gabc',
  },
  {
    text: 'Visionem',
    href: 'https://gregobase.selapa.net/download.php?id=2283&format=gabc&elem=1',
  },
  {
    text: 'Factus est adjutor',
    href: 'https://gregobase.selapa.net/download.php?id=11994&format=gabc',
  },
  {
    text: 'Statuit ea in aeternum',
    href: 'https://gregobase.selapa.net/download.php?id=12642&format=gabc',
  },
  {
    text: 'Trium puerorum',
    href: 'https://gregobase.selapa.net/download.php?id=13283&format=gabc',
  },
  {
    text: 'Dextera Domini fecit',
    href: 'https://gregobase.selapa.net/download.php?id=12593&format=gabc',
  },
  {
    text: 'Assumpsit Jesus discipulos',
    href: 'https://gregobase.selapa.net/download.php?id=12283&format=gabc&elem=1',
  },
  {
    text: 'Domine bonum est',
    href: 'https://gregobase.selapa.net/download.php?id=13017&format=gabc&elem=1',
  },
  {
    text: 'Assumpsit Jesus discipulos',
    href: 'https://gregobase.selapa.net/download.php?id=2645&format=gabc&elem=1',
  },
  {
    text: 'Domine bonum est',
    href: 'https://gregobase.selapa.net/download.php?id=2319&format=gabc&elem=1',
  },
  {
    text: 'Faciamus hic tria',
    href: 'https://gregobase.selapa.net/download.php?id=12546&format=gabc',
  },
  {
    text: 'Faciamus',
    href: 'https://gregobase.selapa.net/download.php?id=2301&format=gabc&elem=1',
  },
  {
    text: 'Unus est enim',
    href: 'https://gregobase.selapa.net/download.php?id=11771&format=gabc&elem=1',
  },
  {
    text: 'Qui me misit',
    href: 'https://gregobase.selapa.net/download.php?id=12766&format=gabc&elem=1',
  },
  {
    text: 'Ego principium',
    href: 'https://gregobase.selapa.net/download.php?id=12832&format=gabc&elem=1',
  },
  {
    text: 'Ego principium',
    href: 'https://gregobase.selapa.net/download.php?id=1989&format=gabc&elem=1',
  },
  {
    text: 'Qui me misit',
    href: 'https://gregobase.selapa.net/download.php?id=2739&format=gabc&elem=1',
  },
  {
    text: 'Unus est enim',
    href: 'https://gregobase.selapa.net/download.php?id=1910&format=gabc&elem=1',
  },
  {
    text: 'Omnes autem vos',
    href: 'https://gregobase.selapa.net/download.php?id=12167&format=gabc&elem=1',
  },
  {
    text: 'Omnes autem vos',
    href: 'https://gregobase.selapa.net/download.php?id=2156&format=gabc&elem=1',
  },
  {
    text: 'Ecce ascendimus... et Filius',
    href: 'https://gregobase.selapa.net/download.php?id=13233&format=gabc&elem=1',
  },
  {
    text: 'Fili recordare',
    href: 'https://gregobase.selapa.net/download.php?id=11796&format=gabc&elem=1',
  },
  {
    text: 'Tradetur enim gentibus',
    href: 'https://gregobase.selapa.net/download.php?id=12120&format=gabc&elem=1',
  },
  {
    text: 'Tradetur enim gentibus',
    href: 'https://gregobase.selapa.net/download.php?id=2268&format=gabc&elem=1',
  },
  {
    text: 'Fili recordare',
    href: 'https://gregobase.selapa.net/download.php?id=1904&format=gabc&elem=1',
  },
  {
    text: 'Malos male perdet',
    href: 'https://gregobase.selapa.net/download.php?id=11867&format=gabc&elem=1',
  },
  {
    text: 'Dives ille guttam',
    href: 'https://gregobase.selapa.net/download.php?id=12602&format=gabc&elem=1',
  },
  {
    text: 'Quaerentes eum tenere',
    href: 'https://gregobase.selapa.net/download.php?id=12830&format=gabc&elem=1',
  },
  {
    text: 'Dives ille guttam',
    href: 'https://gregobase.selapa.net/download.php?id=1992&format=gabc&elem=1',
  },
  {
    text: 'Malos male perdet',
    href: 'https://gregobase.selapa.net/download.php?id=1956&format=gabc&elem=1',
  },
  {
    text: 'Quaerentes eum tenere',
    href: 'https://gregobase.selapa.net/download.php?id=2138&format=gabc&elem=1',
  },
  {
    text: 'Vadam ad patrem',
    href: 'https://gregobase.selapa.net/download.php?id=11925&format=gabc&elem=1',
  },
  {
    text: 'Dixit autem pater ad servos',
    href: 'https://gregobase.selapa.net/download.php?id=13171&format=gabc&elem=1',
  },
  {
    text: 'Vadam ad patrem',
    href: 'https://gregobase.selapa.net/download.php?id=2170&format=gabc&elem=1',
  },
  {
    text: 'Dixit autem pater ad servos',
    href: 'https://gregobase.selapa.net/download.php?id=2282&format=gabc&elem=1',
  },
  {
    text: 'Fac benigne in bona',
    href: 'https://gregobase.selapa.net/download.php?id=12323&format=gabc',
  },
  {
    text: 'Dominus mihi adjutor',
    href: 'https://gregobase.selapa.net/download.php?id=12457&format=gabc',
  },
  {
    text: 'Adhaesit anima (Dom. III. Quadr.)',
    href: 'https://gregobase.selapa.net/download.php?id=12287&format=gabc',
  },
  {
    text: 'Dum fortis armatus',
    href: 'https://gregobase.selapa.net/download.php?id=12314&format=gabc',
  },
  {
    text: 'Vim virtutis suae',
    href: 'https://gregobase.selapa.net/download.php?id=12396&format=gabc',
  },
  {
    text: 'Sol et luna',
    href: 'https://gregobase.selapa.net/download.php?id=13245&format=gabc',
  },
  {
    text: 'Dum fortis',
    href: 'https://gregobase.selapa.net/download.php?id=2065&format=gabc&elem=1',
  },
  {
    text: 'Et cum ejecisset',
    href: 'https://gregobase.selapa.net/download.php?id=11888&format=gabc&elem=1',
  },
  {
    text: 'Si in digito Dei',
    href: 'https://gregobase.selapa.net/download.php?id=12879&format=gabc',
  },
  {
    text: 'Qui non colligit',
    href: 'https://gregobase.selapa.net/download.php?id=12965&format=gabc&elem=1',
  },
  {
    text: 'Et cum ejecisset',
    href: 'https://gregobase.selapa.net/download.php?id=2804&format=gabc&elem=1',
  },
  {
    text: 'Si in digito',
    href: 'https://gregobase.selapa.net/download.php?id=2359&format=gabc&elem=1',
  },
  {
    text: 'Qui non colligit',
    href: 'https://gregobase.selapa.net/download.php?id=2722&format=gabc&elem=1',
  },
  {
    text: 'Extollens quaedam mulier',
    href: 'https://gregobase.selapa.net/download.php?id=12389&format=gabc',
  },
  {
    text: 'Cum immundus spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=13228&format=gabc&elem=1',
  },
  {
    text: 'Cum immundus spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=2367&format=gabc&elem=1',
  },
  {
    text: 'Extollens',
    href: 'https://gregobase.selapa.net/download.php?id=2260&format=gabc&elem=1',
  },
  {
    text: 'Amen dico vobis quia nemo',
    href: 'https://gregobase.selapa.net/download.php?id=12047&format=gabc&elem=1',
  },
  {
    text: 'Jesus autem transiens',
    href: 'https://gregobase.selapa.net/download.php?id=13069&format=gabc&elem=1',
  },
  {
    text: 'Amen dico vobis quia nemo',
    href: 'https://gregobase.selapa.net/download.php?id=2313&format=gabc&elem=1',
  },
  {
    text: 'Jesus autem transiens',
    href: 'https://gregobase.selapa.net/download.php?id=2117&format=gabc&elem=1',
  },
  {
    text: 'Ubi duo vel tres',
    href: 'https://gregobase.selapa.net/download.php?id=12871&format=gabc&elem=1',
  },
  {
    text: 'Si duo ex vobis',
    href: 'https://gregobase.selapa.net/download.php?id=13335&format=gabc',
  },
  {
    text: 'Si duo',
    href: 'https://gregobase.selapa.net/download.php?id=1933&format=gabc&elem=1',
  },
  {
    text: 'Ubi duo vel tres',
    href: 'https://gregobase.selapa.net/download.php?id=2666&format=gabc&elem=1',
  },
  {
    text: 'Audite et intelligite',
    href: 'https://gregobase.selapa.net/download.php?id=13021&format=gabc',
  },
  {
    text: 'Non lotis manibus',
    href: 'https://gregobase.selapa.net/download.php?id=13134&format=gabc&elem=1',
  },
  {
    text: 'Exibant autem daemonia',
    href: 'https://gregobase.selapa.net/download.php?id=13241&format=gabc',
  },
  {
    text: 'Audite',
    href: 'https://gregobase.selapa.net/download.php?id=2032&format=gabc&elem=1',
  },
  {
    text: 'Non lotis manibus',
    href: 'https://gregobase.selapa.net/download.php?id=2538&format=gabc&elem=1',
  },
  {
    text: 'Exibant autem',
    href: 'https://gregobase.selapa.net/download.php?id=1993&format=gabc&elem=1',
  },
  {
    text: 'Aquam quam ego',
    href: 'https://gregobase.selapa.net/download.php?id=12769&format=gabc',
  },
  {
    text: 'Omnes qui habebant',
    href: 'https://gregobase.selapa.net/download.php?id=12893&format=gabc&elem=1',
  },
  {
    text: 'Omnes qui habebant',
    href: 'https://gregobase.selapa.net/download.php?id=2733&format=gabc&elem=1',
  },
  {
    text: 'Aquam',
    href: 'https://gregobase.selapa.net/download.php?id=2512&format=gabc&elem=1',
  },
  {
    text: 'Inclinavit se Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=11990&format=gabc&elem=1',
  },
  {
    text: 'Domine ut video',
    href: 'https://gregobase.selapa.net/download.php?id=12057&format=gabc&elem=1',
  },
  {
    text: 'Domine ut video',
    href: 'https://gregobase.selapa.net/download.php?id=2420&format=gabc&elem=1',
  },
  {
    text: 'Inclinavit se Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=2034&format=gabc&elem=1',
  },
  {
    text: 'Nemo te condemnavit',
    href: 'https://gregobase.selapa.net/download.php?id=12614&format=gabc&elem=1',
  },
  {
    text: 'Bonum est sperare',
    href: 'https://gregobase.selapa.net/download.php?id=13252&format=gabc',
  },
  {
    text: 'Tunc acceptabis',
    href: 'https://gregobase.selapa.net/download.php?id=13341&format=gabc',
  },
  {
    text: 'Nemo te condemnavit',
    href: 'https://gregobase.selapa.net/download.php?id=2786&format=gabc&elem=1',
  },
  {
    text: 'Me suscepit',
    href: 'https://gregobase.selapa.net/download.php?id=12796&format=gabc&elem=1',
  },
  {
    text: 'Potens es Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12880&format=gabc',
  },
  {
    text: 'Reges terrae et omnes',
    href: 'https://gregobase.selapa.net/download.php?id=13024&format=gabc',
  },
  {
    text: 'Cum sublevasset',
    href: 'https://gregobase.selapa.net/download.php?id=12095&format=gabc&elem=1',
  },
  {
    text: 'Accepit ergo Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=12636&format=gabc',
  },
  {
    text: 'Cum sublevasset',
    href: 'https://gregobase.selapa.net/download.php?id=2754&format=gabc&elem=1',
  },
  {
    text: 'Accepit ergo',
    href: 'https://gregobase.selapa.net/download.php?id=2049&format=gabc&elem=1',
  },
  {
    text: 'De quinque panibus',
    href: 'https://gregobase.selapa.net/download.php?id=12413&format=gabc&elem=1',
  },
  {
    text: 'Satiavit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=13195&format=gabc&elem=1',
  },
  {
    text: 'De quinque panibus',
    href: 'https://gregobase.selapa.net/download.php?id=2470&format=gabc&elem=1',
  },
  {
    text: 'Satiavit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2619&format=gabc&elem=1',
  },
  {
    text: 'Illi ergo homines',
    href: 'https://gregobase.selapa.net/download.php?id=1939&format=gabc&elem=1',
  },
  {
    text: 'Illi ergo homines',
    href: 'https://gregobase.selapa.net/download.php?id=13016&format=gabc&elem=1',
  },
  {
    text: 'Subiit ergo in montem',
    href: 'https://gregobase.selapa.net/download.php?id=12757&format=gabc',
  },
  {
    text: 'Subiit ergo',
    href: 'https://gregobase.selapa.net/download.php?id=2196&format=gabc&elem=1',
  },
  {
    text: 'Auferte ista',
    href: 'https://gregobase.selapa.net/download.php?id=1863&format=gabc&elem=1',
  },
  {
    text: 'Auferte ista hinc',
    href: 'https://gregobase.selapa.net/download.php?id=13040&format=gabc&elem=1',
  },
  {
    text: 'Quid me quaeritis',
    href: 'https://gregobase.selapa.net/download.php?id=11895&format=gabc&elem=1',
  },
  {
    text: 'Solvite templum hoc',
    href: 'https://gregobase.selapa.net/download.php?id=12119&format=gabc&elem=1',
  },
  {
    text: 'Solvite templum hoc',
    href: 'https://gregobase.selapa.net/download.php?id=2093&format=gabc&elem=1',
  },
  {
    text: 'Quid me quaeritis',
    href: 'https://gregobase.selapa.net/download.php?id=2729&format=gabc&elem=1',
  },
  {
    text: 'Nemo in eum misit',
    href: 'https://gregobase.selapa.net/download.php?id=12392&format=gabc&elem=1',
  },
  {
    text: 'Rabbi quid peccavit',
    href: 'https://gregobase.selapa.net/download.php?id=13279&format=gabc&elem=1',
  },
  {
    text: 'Nemo in eum misit',
    href: 'https://gregobase.selapa.net/download.php?id=2323&format=gabc&elem=1',
  },
  {
    text: 'Rabbi quid peccavit',
    href: 'https://gregobase.selapa.net/download.php?id=2541&format=gabc&elem=1',
  },
  {
    text: 'Ille homo qui dicitur',
    href: 'https://gregobase.selapa.net/download.php?id=11941&format=gabc',
  },
  {
    text: 'Propheta magnus',
    href: 'https://gregobase.selapa.net/download.php?id=12479&format=gabc&elem=1',
  },
  {
    text: 'Ibat Jesus in civitatem',
    href: 'https://gregobase.selapa.net/download.php?id=12554&format=gabc',
  },
  {
    text: 'Propheta magnus',
    href: 'https://gregobase.selapa.net/download.php?id=12792&format=gabc&elem=1',
  },
  {
    text: 'Ille homo',
    href: 'https://gregobase.selapa.net/download.php?id=2601&format=gabc&elem=1',
  },
  {
    text: 'Ibat Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=2859&format=gabc&elem=1',
  },
  {
    text: 'Domine si hic fuisses',
    href: 'https://gregobase.selapa.net/download.php?id=12026&format=gabc&elem=1',
  },
  {
    text: 'Lazarus amicus',
    href: 'https://gregobase.selapa.net/download.php?id=12696&format=gabc',
  },
  {
    text: 'Lazarus',
    href: 'https://gregobase.selapa.net/download.php?id=2165&format=gabc&elem=1',
  },
  {
    text: 'Domine si hic fuisses',
    href: 'https://gregobase.selapa.net/download.php?id=2329&format=gabc&elem=1',
  },
  {
    text: 'Qui sequitur me',
    href: 'https://gregobase.selapa.net/download.php?id=12251&format=gabc&elem=1',
  },
  {
    text: 'Qui sequitur me',
    href: 'https://gregobase.selapa.net/download.php?id=12690&format=gabc&elem=1',
  },
  {
    text: 'Qui sequitur me',
    href: 'https://gregobase.selapa.net/download.php?id=2865&format=gabc&elem=1',
  },
  {
    text: 'Vexilla Regis (Tempus Passionis)',
    href: 'https://gregobase.selapa.net/download.php?id=12742&format=gabc',
  },
  {
    text: 'Te lucis ante terminum (Temp. Passionis)',
    href: 'https://gregobase.selapa.net/download.php?id=13055&format=gabc',
  },
  {
    text: 'Ego sum qui testimonium',
    href: 'https://gregobase.selapa.net/download.php?id=13172&format=gabc&elem=1',
  },
  {
    text: 'Ego sum qui testimonium',
    href: 'https://gregobase.selapa.net/download.php?id=2740&format=gabc&elem=1',
  },
  {
    text: 'Vide Domine afflictionem',
    href: 'https://gregobase.selapa.net/download.php?id=12931&format=gabc',
  },
  {
    text: 'Popule meus',
    href: 'https://gregobase.selapa.net/download.php?id=11918&format=gabc',
  },
  {
    text: 'Numquid-redditur',
    href: 'https://gregobase.selapa.net/download.php?id=12109&format=gabc',
  },
  {
    text: 'Judicasti Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12134&format=gabc',
  },
  {
    text: 'Popule meus',
    href: 'https://gregobase.selapa.net/download.php?id=12801&format=gabc',
  },
  {
    text: 'Judicasti Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12970&format=gabc',
  },
  {
    text: 'Numquid redditur',
    href: 'https://gregobase.selapa.net/download.php?id=12996&format=gabc',
  },
  {
    text: 'In tribulatione invocavi',
    href: 'https://gregobase.selapa.net/download.php?id=13060&format=gabc',
  },
  {
    text: 'Lustra sex qui jam',
    href: 'https://gregobase.selapa.net/download.php?id=13250&format=gabc',
  },
  {
    text: 'Dicebat Jesus turbis',
    href: 'https://gregobase.selapa.net/download.php?id=11846&format=gabc',
  },
  {
    text: 'Ego daemonium non habeo',
    href: 'https://gregobase.selapa.net/download.php?id=13260&format=gabc',
  },
  {
    text: 'Dicebat Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=1977&format=gabc&elem=1',
  },
  {
    text: 'Ego daemonium',
    href: 'https://gregobase.selapa.net/download.php?id=2413&format=gabc&elem=1',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (Temp. Passionis)',
    href: 'https://gregobase.selapa.net/download.php?id=13347&format=gabc',
  },
  {
    text: 'Amen amen dico vobis si quis',
    href: 'https://gregobase.selapa.net/download.php?id=12422&format=gabc',
  },
  {
    text: 'Ego gloriam meam',
    href: 'https://gregobase.selapa.net/download.php?id=12435&format=gabc',
  },
  {
    text: 'Tulerunt lapides',
    href: 'https://gregobase.selapa.net/download.php?id=13311&format=gabc&elem=1',
  },
  {
    text: 'Ego gloriam',
    href: 'https://gregobase.selapa.net/download.php?id=2873&format=gabc&elem=1',
  },
  {
    text: 'Amen amen dico vobis si',
    href: 'https://gregobase.selapa.net/download.php?id=2017&format=gabc&elem=1',
  },
  {
    text: 'Tulerunt lapides',
    href: 'https://gregobase.selapa.net/download.php?id=2214&format=gabc&elem=1',
  },
  {
    text: 'Abraham pater',
    href: 'https://gregobase.selapa.net/download.php?id=12225&format=gabc',
  },
  {
    text: 'Abraham pater vester',
    href: 'https://gregobase.selapa.net/download.php?id=2718&format=gabc&elem=1',
  },
  {
    text: 'Si quis sitit veniat',
    href: 'https://gregobase.selapa.net/download.php?id=12239&format=gabc',
  },
  {
    text: 'In die magno festivitatis',
    href: 'https://gregobase.selapa.net/download.php?id=12767&format=gabc',
  },
  {
    text: 'In die magno',
    href: 'https://gregobase.selapa.net/download.php?id=2401&format=gabc&elem=1',
  },
  {
    text: 'Si quis sitit',
    href: 'https://gregobase.selapa.net/download.php?id=2451&format=gabc&elem=1',
  },
  {
    text: 'Vos ascendite ad diem',
    href: 'https://gregobase.selapa.net/download.php?id=12161&format=gabc',
  },
  {
    text: 'Tempus meum nondum',
    href: 'https://gregobase.selapa.net/download.php?id=12638&format=gabc',
  },
  {
    text: 'Tempus meum',
    href: 'https://gregobase.selapa.net/download.php?id=2122&format=gabc&elem=1',
  },
  {
    text: 'Vos ascendite',
    href: 'https://gregobase.selapa.net/download.php?id=2415&format=gabc&elem=1',
  },
  {
    text: 'Multa bona opera',
    href: 'https://gregobase.selapa.net/download.php?id=11955&format=gabc&elem=1',
  },
  {
    text: 'Oves meae vocem',
    href: 'https://gregobase.selapa.net/download.php?id=13001&format=gabc',
  },
  {
    text: 'Oves meae',
    href: 'https://gregobase.selapa.net/download.php?id=2657&format=gabc&elem=1',
  },
  {
    text: 'Multa bona opera',
    href: 'https://gregobase.selapa.net/download.php?id=2712&format=gabc&elem=1',
  },
  {
    text: 'Magister dicit',
    href: 'https://gregobase.selapa.net/download.php?id=2132&format=gabc&elem=1',
  },
  {
    text: 'Desiderio desideravi',
    href: 'https://gregobase.selapa.net/download.php?id=12590&format=gabc&elem=1',
  },
  {
    text: 'Appropinquabat autem',
    href: 'https://gregobase.selapa.net/download.php?id=13326&format=gabc',
  },
  {
    text: 'Desiderio desideravi',
    href: 'https://gregobase.selapa.net/download.php?id=2691&format=gabc&elem=1',
  },
  {
    text: 'Clarifica me Pater',
    href: 'https://gregobase.selapa.net/download.php?id=12415&format=gabc',
  },
  {
    text: 'Clarifica me Pater',
    href: 'https://gregobase.selapa.net/download.php?id=13072&format=gabc',
  },
  {
    text: 'Principes sacerdotum',
    href: 'https://gregobase.selapa.net/download.php?id=13150&format=gabc',
  },
  {
    text: 'Principes... consilium',
    href: 'https://gregobase.selapa.net/download.php?id=2325&format=gabc&elem=1',
  },
  {
    text: 'Dominus Deus auxiliator',
    href: 'https://gregobase.selapa.net/download.php?id=12358&format=gabc',
  },
  {
    text: 'Pater juste mundus',
    href: 'https://gregobase.selapa.net/download.php?id=12787&format=gabc',
  },
  {
    text: 'Pater juste',
    href: 'https://gregobase.selapa.net/download.php?id=2291&format=gabc&elem=1',
  },
  {
    text: 'Confundantur qui me',
    href: 'https://gregobase.selapa.net/download.php?id=12328&format=gabc',
  },
  {
    text: 'Judica causam',
    href: 'https://gregobase.selapa.net/download.php?id=12704&format=gabc',
  },
  {
    text: 'Cum Angelis et pueris',
    href: 'https://gregobase.selapa.net/download.php?id=12829&format=gabc',
  },
  {
    text: 'Circumdantes circumdederunt',
    href: 'https://gregobase.selapa.net/download.php?id=13342&format=gabc',
  },
  {
    text: 'Pueri Hebraeorum portantes',
    href: 'https://gregobase.selapa.net/download.php?id=12531&format=gabc',
  },
  {
    text: 'Turba multa',
    href: 'https://gregobase.selapa.net/download.php?id=13225&format=gabc',
  },
  {
    text: 'Pueri Hebraeorum vestimenta',
    href: 'https://gregobase.selapa.net/download.php?id=12140&format=gabc',
  },
  {
    text: 'Tibi revelavi',
    href: 'https://gregobase.selapa.net/download.php?id=12826&format=gabc&elem=1',
  },
  {
    text: 'Tibi revelavi',
    href: 'https://gregobase.selapa.net/download.php?id=2099&format=gabc&elem=1',
  },
  {
    text: 'Invocabo nomen',
    href: 'https://gregobase.selapa.net/download.php?id=12572&format=gabc',
  },
  {
    text: 'Scriptum est enim: Percutiam',
    href: 'https://gregobase.selapa.net/download.php?id=13032&format=gabc&elem=1',
  },
  {
    text: 'Invocabo',
    href: 'https://gregobase.selapa.net/download.php?id=2439&format=gabc&elem=1',
  },
  {
    text: 'Scriptum est enim: Percutiam',
    href: 'https://gregobase.selapa.net/download.php?id=2162&format=gabc&elem=1',
  },
  {
    text: 'Appenderunt mercedem',
    href: 'https://gregobase.selapa.net/download.php?id=12202&format=gabc',
  },
  {
    text: 'Framea suscitare',
    href: 'https://gregobase.selapa.net/download.php?id=12266&format=gabc',
  },
  {
    text: 'Inundaverunt aquae',
    href: 'https://gregobase.selapa.net/download.php?id=12730&format=gabc',
  },
  {
    text: 'Faciem meam',
    href: 'https://gregobase.selapa.net/download.php?id=17741&format=gabc',
  },
  {
    text: 'Clarifica me Pater',
    href: 'https://gregobase.selapa.net/download.php?id=12415&format=gabc',
  },
  {
    text: 'Labia insurgentium',
    href: 'https://gregobase.selapa.net/download.php?id=12587&format=gabc',
  },
  {
    text: 'Clarifica me Pater',
    href: 'https://gregobase.selapa.net/download.php?id=13072&format=gabc',
  },
  {
    text: 'Clarifica me',
    href: 'https://gregobase.selapa.net/download.php?id=2678&format=gabc&elem=1',
  },
  {
    text: 'Vide Domine et considera',
    href: 'https://gregobase.selapa.net/download.php?id=12528&format=gabc',
  },
  {
    text: 'Discerne causam meam Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12961&format=gabc',
  },
  {
    text: 'Non haberes in me',
    href: 'https://gregobase.selapa.net/download.php?id=13330&format=gabc',
  },
  {
    text: 'Dum tribularer',
    href: 'https://gregobase.selapa.net/download.php?id=11893&format=gabc',
  },
  {
    text: 'Domine vim patior',
    href: 'https://gregobase.selapa.net/download.php?id=12815&format=gabc',
  },
  {
    text: 'Dixerunt impii',
    href: 'https://gregobase.selapa.net/download.php?id=12943&format=gabc',
  },
  {
    text: 'Ante diem festum',
    href: 'https://gregobase.selapa.net/download.php?id=13168&format=gabc',
  },
  {
    text: 'Libera me de sanguinibus',
    href: 'https://gregobase.selapa.net/download.php?id=11851&format=gabc',
  },
  {
    text: 'Contumelias et terrores',
    href: 'https://gregobase.selapa.net/download.php?id=13255&format=gabc',
  },
  {
    text: 'Potestatem habeo',
    href: 'https://gregobase.selapa.net/download.php?id=12169&format=gabc',
  },
  {
    text: 'Simon dormis',
    href: 'https://gregobase.selapa.net/download.php?id=12070&format=gabc',
  },
  {
    text: 'Tu autem Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12367&format=gabc',
  },
  {
    text: 'Omnes inimici mei',
    href: 'https://gregobase.selapa.net/download.php?id=12639&format=gabc',
  },
  {
    text: 'Fac Domine judicium',
    href: 'https://gregobase.selapa.net/download.php?id=12904&format=gabc',
  },
  {
    text: 'Ancilla dixit Petro',
    href: 'https://gregobase.selapa.net/download.php?id=12012&format=gabc',
  },
  {
    text: 'Justificeris Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2046&format=gabc&elem=1',
  },
  {
    text: 'Exhortatus es',
    href: 'https://gregobase.selapa.net/download.php?id=12297&format=gabc',
  },
  {
    text: 'Dominus tamquam ovis',
    href: 'https://gregobase.selapa.net/download.php?id=12377&format=gabc',
  },
  {
    text: 'Contritum est cor meum',
    href: 'https://gregobase.selapa.net/download.php?id=2792&format=gabc&elem=1',
  },
  {
    text: 'Oblatus est',
    href: 'https://gregobase.selapa.net/download.php?id=2545&format=gabc&elem=1',
  },
  {
    text: 'Traditor autem dedit',
    href: 'https://gregobase.selapa.net/download.php?id=12972&format=gabc',
  },
  {
    text: 'Christus factus est',
    href: 'https://gregobase.selapa.net/download.php?id=1862&format=gabc&elem=1',
  },
  {
    text: 'Traditor autem',
    href: 'https://gregobase.selapa.net/download.php?id=2458&format=gabc&elem=1',
  },
  {
    text: 'Calicem salutaris ... et nomen',
    href: 'https://gregobase.selapa.net/download.php?id=12303&format=gabc',
  },
  {
    text: 'Ab hominibus iniquis',
    href: 'https://gregobase.selapa.net/download.php?id=12588&format=gabc',
  },
  {
    text: 'Cum his qui oderunt',
    href: 'https://gregobase.selapa.net/download.php?id=12980&format=gabc&elem=1',
  },
  {
    text: 'Cum his qui oderunt',
    href: 'https://gregobase.selapa.net/download.php?id=2450&format=gabc&elem=1',
  },
  {
    text: 'Coenantibus autem',
    href: 'https://gregobase.selapa.net/download.php?id=11952&format=gabc',
  },
  {
    text: 'Custodi me a laqueo',
    href: 'https://gregobase.selapa.net/download.php?id=12932&format=gabc&elem=1',
  },
  {
    text: 'Custodi me a laqueo',
    href: 'https://gregobase.selapa.net/download.php?id=2784&format=gabc&elem=1',
  },
  {
    text: 'Considerabam ad dexteram',
    href: 'https://gregobase.selapa.net/download.php?id=1831&format=gabc&elem=1',
  },
  {
    text: 'Considerabam ad dexteram',
    href: 'https://gregobase.selapa.net/download.php?id=12658&format=gabc&elem=1',
  },
  {
    text: 'Proprio Filio suo',
    href: 'https://gregobase.selapa.net/download.php?id=2555&format=gabc&elem=1',
  },
  {
    text: 'Anxiatus est',
    href: 'https://gregobase.selapa.net/download.php?id=2753&format=gabc&elem=1',
  },
  {
    text: 'Ait latro',
    href: 'https://gregobase.selapa.net/download.php?id=2552&format=gabc&elem=1',
  },
  {
    text: 'Posuerunt super caput',
    href: 'https://gregobase.selapa.net/download.php?id=12514&format=gabc&elem=1',
  },
  {
    text: 'Dum conturbata',
    href: 'https://gregobase.selapa.net/download.php?id=2827&format=gabc&elem=1',
  },
  {
    text: 'Memento mei',
    href: 'https://gregobase.selapa.net/download.php?id=1827&format=gabc&elem=1',
  },
  {
    text: 'Memento mei Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12564&format=gabc&elem=1',
  },
  {
    text: 'Posuerunt super caput',
    href: 'https://gregobase.selapa.net/download.php?id=2896&format=gabc&elem=1',
  },
  {
    text: 'Cum accepisset acetum',
    href: 'https://gregobase.selapa.net/download.php?id=13124&format=gabc',
  },
  {
    text: 'O mors',
    href: 'https://gregobase.selapa.net/download.php?id=1957&format=gabc&elem=1',
  },
  {
    text: 'Plangent eum',
    href: 'https://gregobase.selapa.net/download.php?id=2212&format=gabc&elem=1',
  },
  {
    text: 'Attendite universi',
    href: 'https://gregobase.selapa.net/download.php?id=2263&format=gabc&elem=1',
  },
  {
    text: 'A porta inferi',
    href: 'https://gregobase.selapa.net/download.php?id=12668&format=gabc&elem=1',
  },
  {
    text: 'A porta inferi',
    href: 'https://gregobase.selapa.net/download.php?id=2253&format=gabc&elem=1',
  },
  {
    text: 'O vos omnes',
    href: 'https://gregobase.selapa.net/download.php?id=1901&format=gabc&elem=1',
  },
  {
    text: 'Mulieres',
    href: 'https://gregobase.selapa.net/download.php?id=2288&format=gabc&elem=1',
  },
  {
    text: 'Vespere autem sabbati',
    href: 'https://gregobase.selapa.net/download.php?id=12662&format=gabc',
  },
  {
    text: 'Et ecce terraemotus',
    href: 'https://gregobase.selapa.net/download.php?id=11761&format=gabc',
  },
  {
    text: 'Angelus autem Domini',
    href: 'https://gregobase.selapa.net/download.php?id=12401&format=gabc&elem=1',
  },
  {
    text: 'Angelus autem Domini',
    href: 'https://gregobase.selapa.net/download.php?id=1952&format=gabc&elem=1',
  },
  {
    text: 'Respondens autem Angelus',
    href: 'https://gregobase.selapa.net/download.php?id=12607&format=gabc&elem=1',
  },
  {
    text: 'Erat autem aspectus',
    href: 'https://gregobase.selapa.net/download.php?id=12875&format=gabc&elem=1',
  },
  {
    text: 'Prae timore autem',
    href: 'https://gregobase.selapa.net/download.php?id=13220&format=gabc&elem=1',
  },
  {
    text: 'Erat autem aspectus',
    href: 'https://gregobase.selapa.net/download.php?id=2344&format=gabc&elem=1',
  },
  {
    text: 'Prae timore autem',
    href: 'https://gregobase.selapa.net/download.php?id=2959&format=gabc&elem=1',
  },
  {
    text: 'Respondens autem Angelus',
    href: 'https://gregobase.selapa.net/download.php?id=2171&format=gabc&elem=1',
  },
  {
    text: 'Et valde mane',
    href: 'https://gregobase.selapa.net/download.php?id=12011&format=gabc',
  },
  {
    text: 'Haec dies quam fecit',
    href: 'https://gregobase.selapa.net/download.php?id=12993&format=gabc',
  },
  {
    text: 'Benedicamus Domino Alleluia',
    href: 'https://gregobase.selapa.net/download.php?id=15864&format=gabc',
  },
  {
    text: 'Haec dies',
    href: 'https://gregobase.selapa.net/download.php?id=2230&format=gabc&elem=1',
  },
  {
    text: 'Et respicientes viderunt',
    href: 'https://gregobase.selapa.net/download.php?id=12480&format=gabc',
  },
  {
    text: 'Et respicientes',
    href: 'https://gregobase.selapa.net/download.php?id=2732&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (Complet. Dom. Resurr.)',
    href: 'https://gregobase.selapa.net/download.php?id=12632&format=gabc',
  },
  {
    text: 'Alleluia (Compline of Easter Octave)',
    href: 'https://gregobase.selapa.net/download.php?id=4499&format=gabc&elem=1',
  },
  {
    text: 'Qui sunt hi sermones',
    href: 'https://gregobase.selapa.net/download.php?id=13011&format=gabc&elem=1',
  },
  {
    text: 'Jesus junxit se',
    href: 'https://gregobase.selapa.net/download.php?id=11971&format=gabc',
  },
  {
    text: 'Qui sunt hi sermones',
    href: 'https://gregobase.selapa.net/download.php?id=2314&format=gabc&elem=1',
  },
  {
    text: 'Videte manus meas',
    href: 'https://gregobase.selapa.net/download.php?id=11908&format=gabc&elem=1',
  },
  {
    text: 'Stetit Jesus in medio',
    href: 'https://gregobase.selapa.net/download.php?id=12689&format=gabc',
  },
  {
    text: 'Videte manus meas',
    href: 'https://gregobase.selapa.net/download.php?id=2148&format=gabc&elem=1',
  },
  {
    text: 'Maria stabat',
    href: 'https://gregobase.selapa.net/download.php?id=11828&format=gabc',
  },
  {
    text: 'Mittite in dexteram',
    href: 'https://gregobase.selapa.net/download.php?id=12153&format=gabc',
  },
  {
    text: 'Dixit Jesus discipulis',
    href: 'https://gregobase.selapa.net/download.php?id=12189&format=gabc&elem=1',
  },
  {
    text: 'Dixit Jesus discipulis',
    href: 'https://gregobase.selapa.net/download.php?id=2023&format=gabc&elem=1',
  },
  {
    text: 'Tulerunt Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=11847&format=gabc&elem=1',
  },
  {
    text: 'Undecim discipuli',
    href: 'https://gregobase.selapa.net/download.php?id=12261&format=gabc',
  },
  {
    text: 'Tulerunt Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=2150&format=gabc&elem=1',
  },
  {
    text: 'Alleluia (T. P. Vesp. Sabb.)',
    href: 'https://gregobase.selapa.net/download.php?id=11987&format=gabc',
  },
  {
    text: 'Data est mihi',
    href: 'https://gregobase.selapa.net/download.php?id=12665&format=gabc&elem=1',
  },
  {
    text: 'Currebant',
    href: 'https://gregobase.selapa.net/download.php?id=12917&format=gabc',
  },
  {
    text: 'Alleluia (T. P. Vesp. Sabb.)',
    href: 'https://gregobase.selapa.net/download.php?id=13192&format=gabc',
  },
  {
    text: 'Data est mihi',
    href: 'https://gregobase.selapa.net/download.php?id=2917&format=gabc&elem=1',
  },
  {
    text: 'Ad regias Agni dapes',
    href: 'https://gregobase.selapa.net/download.php?id=12282&format=gabc&elem=1',
  },
  {
    text: 'Ad regias Agni dapes',
    href: 'https://gregobase.selapa.net/download.php?id=2932&format=gabc&elem=1',
  },
  {
    text: 'Ad regias Agni dapes (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=12428&format=gabc',
  },
  {
    text: 'Ad regias Agni dapes (another download)',
    href: 'https://gregobase.selapa.net/download.php?id=2473&format=gabc&elem=1',
  },
  {
    text: 'Cum esset sero die',
    href: 'https://gregobase.selapa.net/download.php?id=12464&format=gabc',
  },
  {
    text: 'Cum esset sero',
    href: 'https://gregobase.selapa.net/download.php?id=1885&format=gabc&elem=1',
  },
  {
    text: 'Aurora caelum',
    href: 'https://gregobase.selapa.net/download.php?id=12353&format=gabc',
  },
  {
    text: 'Alleluia (T. P. Laud. Dom.)',
    href: 'https://gregobase.selapa.net/download.php?id=12936&format=gabc',
  },
  {
    text: 'Aurora caelum (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=12253&format=gabc',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (Temp. Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=11850&format=gabc',
  },
  {
    text: 'Alleluia (T. P. Vesp. Dom.)',
    href: 'https://gregobase.selapa.net/download.php?id=12083&format=gabc',
  },
  {
    text: 'Alleluia (T. P. Vesp. Dom.)',
    href: 'https://gregobase.selapa.net/download.php?id=12566&format=gabc',
  },
  {
    text: 'Post dies octo januis',
    href: 'https://gregobase.selapa.net/download.php?id=13155&format=gabc',
  },
  {
    text: 'Post dies octo',
    href: 'https://gregobase.selapa.net/download.php?id=1930&format=gabc&elem=1',
  },
  {
    text: 'Surgens Jesus mane',
    href: 'https://gregobase.selapa.net/download.php?id=12288&format=gabc',
  },
  {
    text: 'Pax vobis ego sum',
    href: 'https://gregobase.selapa.net/download.php?id=12387&format=gabc',
  },
  {
    text: 'Pax vobis ego sum',
    href: 'https://gregobase.selapa.net/download.php?id=12598&format=gabc',
  },
  {
    text: 'Praecedam vos',
    href: 'https://gregobase.selapa.net/download.php?id=11770&format=gabc',
  },
  {
    text: 'Mitte manum tuam',
    href: 'https://gregobase.selapa.net/download.php?id=12184&format=gabc',
  },
  {
    text: 'Ego sum vitis vera',
    href: 'https://gregobase.selapa.net/download.php?id=12312&format=gabc',
  },
  {
    text: 'Quia vidisti me',
    href: 'https://gregobase.selapa.net/download.php?id=12695&format=gabc&elem=1',
  },
  {
    text: 'Quia vidisti me',
    href: 'https://gregobase.selapa.net/download.php?id=13281&format=gabc&elem=1',
  },
  {
    text: 'Quia vidisti me',
    href: 'https://gregobase.selapa.net/download.php?id=2517&format=gabc&elem=1',
  },
  {
    text: 'Ardens est cor meum',
    href: 'https://gregobase.selapa.net/download.php?id=11986&format=gabc',
  },
  {
    text: 'Misi digitum meum',
    href: 'https://gregobase.selapa.net/download.php?id=12460&format=gabc',
  },
  {
    text: 'Venerunt ad monumentum',
    href: 'https://gregobase.selapa.net/download.php?id=12052&format=gabc',
  },
  {
    text: 'Ego sum pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=1833&format=gabc&elem=1',
  },
  {
    text: 'Ego sum pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=13340&format=gabc&elem=1',
  },
  {
    text: 'Ego sum pastor bonus',
    href: 'https://gregobase.selapa.net/download.php?id=12182&format=gabc&elem=1',
  },
  {
    text: 'Ego sum pastor bonus',
    href: 'https://gregobase.selapa.net/download.php?id=2247&format=gabc&elem=1',
  },
  {
    text: 'Euntes in mundum alleluia',
    href: 'https://gregobase.selapa.net/download.php?id=12890&format=gabc',
  },
  {
    text: 'Pastor bonus animam',
    href: 'https://gregobase.selapa.net/download.php?id=12204&format=gabc',
  },
  {
    text: 'Euntes in mundum docete',
    href: 'https://gregobase.selapa.net/download.php?id=12755&format=gabc',
  },
  {
    text: 'Mercenarius est cujus',
    href: 'https://gregobase.selapa.net/download.php?id=12388&format=gabc',
  },
  {
    text: 'Sicut novit me',
    href: 'https://gregobase.selapa.net/download.php?id=12525&format=gabc',
  },
  {
    text: 'Tu solus peregrinus',
    href: 'https://gregobase.selapa.net/download.php?id=12765&format=gabc',
  },
  {
    text: 'Ite nuntiate fratribus',
    href: 'https://gregobase.selapa.net/download.php?id=12867&format=gabc',
  },
  {
    text: 'Alias oves habeo',
    href: 'https://gregobase.selapa.net/download.php?id=12891&format=gabc',
  },
  {
    text: 'Nonne sic oportuit',
    href: 'https://gregobase.selapa.net/download.php?id=13095&format=gabc',
  },
  {
    text: 'Modicum et non videbitis',
    href: 'https://gregobase.selapa.net/download.php?id=13152&format=gabc',
  },
  {
    text: 'Modicum et non videbitis me',
    href: 'https://gregobase.selapa.net/download.php?id=2206&format=gabc&elem=1',
  },
  {
    text: 'Amen amen dico vobis quia plorabitis',
    href: 'https://gregobase.selapa.net/download.php?id=12944&format=gabc',
  },
  {
    text: 'Amen amen... quia plorabitis',
    href: 'https://gregobase.selapa.net/download.php?id=2669&format=gabc&elem=1',
  },
  {
    text: 'Et incipiens a Moyse',
    href: 'https://gregobase.selapa.net/download.php?id=12489&format=gabc',
  },
  {
    text: 'Tristitia vestra vertetur',
    href: 'https://gregobase.selapa.net/download.php?id=12301&format=gabc',
  },
  {
    text: 'Et coegerunt illum',
    href: 'https://gregobase.selapa.net/download.php?id=12726&format=gabc',
  },
  {
    text: 'Tristitia implevit cor',
    href: 'https://gregobase.selapa.net/download.php?id=12906&format=gabc',
  },
  {
    text: 'Mane nobiscum',
    href: 'https://gregobase.selapa.net/download.php?id=13284&format=gabc',
  },
  {
    text: 'Tristitia vestra alleluia',
    href: 'https://gregobase.selapa.net/download.php?id=12164&format=gabc',
  },
  {
    text: 'Et intravit cum illis',
    href: 'https://gregobase.selapa.net/download.php?id=13087&format=gabc',
  },
  {
    text: 'Amen amen dico vobis iterum',
    href: 'https://gregobase.selapa.net/download.php?id=12776&format=gabc',
  },
  {
    text: 'Cognoverunt Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=11845&format=gabc',
  },
  {
    text: 'Vado ad eum ... et nemo',
    href: 'https://gregobase.selapa.net/download.php?id=12231&format=gabc',
  },
  {
    text: 'Vado ad eum... et nemo',
    href: 'https://gregobase.selapa.net/download.php?id=2452&format=gabc&elem=1',
  },
  {
    text: 'Vado ad eum... sed quia',
    href: 'https://gregobase.selapa.net/download.php?id=2168&format=gabc&elem=1',
  },
  {
    text: 'Vado ad eum ... sed quia',
    href: 'https://gregobase.selapa.net/download.php?id=12565&format=gabc',
  },
  {
    text: 'Nonne cor nostrum',
    href: 'https://gregobase.selapa.net/download.php?id=12228&format=gabc',
  },
  {
    text: 'Ego veritatem',
    href: 'https://gregobase.selapa.net/download.php?id=13019&format=gabc',
  },
  {
    text: 'Pax vobis ego sum',
    href: 'https://gregobase.selapa.net/download.php?id=12387&format=gabc',
  },
  {
    text: 'Pax vobis ego sum',
    href: 'https://gregobase.selapa.net/download.php?id=12598&format=gabc',
  },
  {
    text: 'Cum venerit Paraclitus Spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=12179&format=gabc',
  },
  {
    text: 'Spiritus carnem et ossa',
    href: 'https://gregobase.selapa.net/download.php?id=12486&format=gabc',
  },
  {
    text: 'Adhuc multa',
    href: 'https://gregobase.selapa.net/download.php?id=12267&format=gabc',
  },
  {
    text: 'Obtulerunt discipuli',
    href: 'https://gregobase.selapa.net/download.php?id=13026&format=gabc',
  },
  {
    text: 'Non enim loquetur',
    href: 'https://gregobase.selapa.net/download.php?id=12698&format=gabc',
  },
  {
    text: 'Usque modo non petistis',
    href: 'https://gregobase.selapa.net/download.php?id=12469&format=gabc',
  },
  {
    text: 'Isti sunt sermones',
    href: 'https://gregobase.selapa.net/download.php?id=12864&format=gabc',
  },
  {
    text: 'Usque modo',
    href: 'https://gregobase.selapa.net/download.php?id=2567&format=gabc&elem=1',
  },
  {
    text: 'Petite et accipietis ut',
    href: 'https://gregobase.selapa.net/download.php?id=12196&format=gabc',
  },
  {
    text: 'Petite et accipietis',
    href: 'https://gregobase.selapa.net/download.php?id=2217&format=gabc&elem=1',
  },
  {
    text: 'Petite et accipietis quaerite',
    href: 'https://gregobase.selapa.net/download.php?id=15304&format=gabc',
  },
  {
    text: 'Oportebat pati',
    href: 'https://gregobase.selapa.net/download.php?id=12136&format=gabc',
  },
  {
    text: 'Ipse enim Pater',
    href: 'https://gregobase.selapa.net/download.php?id=12455&format=gabc',
  },
  {
    text: 'Pater venit hora',
    href: 'https://gregobase.selapa.net/download.php?id=13130&format=gabc',
  },
  {
    text: 'Exivi a Patre',
    href: 'https://gregobase.selapa.net/download.php?id=12035&format=gabc',
  },
  {
    text: 'Salutis humanae sator',
    href: 'https://gregobase.selapa.net/download.php?id=13157&format=gabc',
  },
  {
    text: 'Salutis humanae',
    href: 'https://gregobase.selapa.net/download.php?id=1288&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Ascensione)',
    href: 'https://gregobase.selapa.net/download.php?id=12191&format=gabc',
  },
  {
    text: 'Pater manifestavi',
    href: 'https://gregobase.selapa.net/download.php?id=13248&format=gabc&elem=1',
  },
  {
    text: 'Pater manifestavi',
    href: 'https://gregobase.selapa.net/download.php?id=2941&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Tempore Ascensionis)',
    href: 'https://gregobase.selapa.net/download.php?id=2764&format=gabc&elem=1',
  },
  {
    text: 'Viri Galilaei',
    href: 'https://gregobase.selapa.net/download.php?id=12250&format=gabc&elem=1',
  },
  {
    text: 'Cumque intuerentur',
    href: 'https://gregobase.selapa.net/download.php?id=12648&format=gabc&elem=1',
  },
  {
    text: 'Viri Galilaei',
    href: 'https://gregobase.selapa.net/download.php?id=1888&format=gabc&elem=1',
  },
  {
    text: 'Cumque intuerentur',
    href: 'https://gregobase.selapa.net/download.php?id=2651&format=gabc&elem=1',
  },
  {
    text: 'Elevatis manibus',
    href: 'https://gregobase.selapa.net/download.php?id=11803&format=gabc&elem=1',
  },
  {
    text: 'Videntibus illis',
    href: 'https://gregobase.selapa.net/download.php?id=12562&format=gabc&elem=1',
  },
  {
    text: 'Exaltate Regem regum',
    href: 'https://gregobase.selapa.net/download.php?id=12678&format=gabc',
  },
  {
    text: 'Ascendo ad Patrem',
    href: 'https://gregobase.selapa.net/download.php?id=13029&format=gabc',
  },
  {
    text: 'Elevatis manibus',
    href: 'https://gregobase.selapa.net/download.php?id=1971&format=gabc&elem=1',
  },
  {
    text: 'Exaltate Regem',
    href: 'https://gregobase.selapa.net/download.php?id=2072&format=gabc&elem=1',
  },
  {
    text: 'Videntibus illis',
    href: 'https://gregobase.selapa.net/download.php?id=2362&format=gabc&elem=1',
  },
  {
    text: 'Ascendo',
    href: 'https://gregobase.selapa.net/download.php?id=2815&format=gabc&elem=1',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (In Ascensione)',
    href: 'https://gregobase.selapa.net/download.php?id=12248&format=gabc',
  },
  {
    text: 'Ascendit Deus',
    href: 'https://gregobase.selapa.net/download.php?id=12133&format=gabc&elem=1',
  },
  {
    text: 'Ascendens Christus',
    href: 'https://gregobase.selapa.net/download.php?id=13002&format=gabc&elem=1',
  },
  {
    text: 'Ascendit Deus',
    href: 'https://gregobase.selapa.net/download.php?id=3220&format=gabc&elem=1',
  },
  {
    text: 'Ascendens Christus',
    href: 'https://gregobase.selapa.net/download.php?id=3202&format=gabc&elem=1',
  },
  {
    text: 'Ascendo ad Patrem',
    href: 'https://gregobase.selapa.net/download.php?id=13212&format=gabc',
  },
  {
    text: 'Ascendo ad Patrem meum',
    href: 'https://gregobase.selapa.net/download.php?id=3128&format=gabc&elem=1',
  },
  {
    text: 'O Rex gloriae Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12586&format=gabc',
  },
  {
    text: 'O Rex gloriae',
    href: 'https://gregobase.selapa.net/download.php?id=1916&format=gabc&elem=1',
  },
  {
    text: 'Cum venerit Paraclitus',
    href: 'https://gregobase.selapa.net/download.php?id=1850&format=gabc&elem=1',
  },
  {
    text: 'Cum venerit Paraclitus quem',
    href: 'https://gregobase.selapa.net/download.php?id=13262&format=gabc&elem=1',
  },
  {
    text: 'Haec locutus sum vobis',
    href: 'https://gregobase.selapa.net/download.php?id=12499&format=gabc&elem=1',
  },
  {
    text: 'Haec locutus sum vobis',
    href: 'https://gregobase.selapa.net/download.php?id=1981&format=gabc&elem=1',
  },
  {
    text: 'Veni Creator Spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=2923&format=gabc&elem=1',
  },
  {
    text: 'Veni Creator Spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=13353&format=gabc&elem=1',
  },
  {
    text: 'Non vos relinquam',
    href: 'https://gregobase.selapa.net/download.php?id=11935&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Pentecoste)',
    href: 'https://gregobase.selapa.net/download.php?id=12101&format=gabc',
  },
  {
    text: 'Jam lucis orto sidere (In Pentecoste)',
    href: 'https://gregobase.selapa.net/download.php?id=19256&format=gabc',
  },
  {
    text: 'Rector potens (In Pentecoste)',
    href: 'https://gregobase.selapa.net/download.php?id=19257&format=gabc',
  },
  {
    text: 'Non vos relinquam',
    href: 'https://gregobase.selapa.net/download.php?id=3003&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (Pentecost)',
    href: 'https://gregobase.selapa.net/download.php?id=2710&format=gabc&elem=1',
  },
  {
    text: 'Dum complerentur',
    href: 'https://gregobase.selapa.net/download.php?id=2583&format=gabc&elem=1',
  },
  {
    text: 'Dum complerentur dies',
    href: 'https://gregobase.selapa.net/download.php?id=12822&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Domini replevit',
    href: 'https://gregobase.selapa.net/download.php?id=2393&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Domini replevit',
    href: 'https://gregobase.selapa.net/download.php?id=12623&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Domini replevit',
    href: 'https://gregobase.selapa.net/download.php?id=12938&format=gabc&elem=1',
  },
  {
    text: 'Repleti sunt omnes',
    href: 'https://gregobase.selapa.net/download.php?id=2527&format=gabc&elem=1',
  },
  {
    text: 'Repleti sunt omnes',
    href: 'https://gregobase.selapa.net/download.php?id=12054&format=gabc&elem=1',
  },
  {
    text: 'Fontes et omnia',
    href: 'https://gregobase.selapa.net/download.php?id=2550&format=gabc&elem=1',
  },
  {
    text: 'Fontes et omnia',
    href: 'https://gregobase.selapa.net/download.php?id=13306&format=gabc&elem=1',
  },
  {
    text: 'Loquebantur (Ant.)',
    href: 'https://gregobase.selapa.net/download.php?id=2311&format=gabc&elem=1',
  },
  {
    text: 'Loquebantur variis',
    href: 'https://gregobase.selapa.net/download.php?id=12181&format=gabc&elem=1',
  },
  {
    text: 'Beata nobis gaudia',
    href: 'https://gregobase.selapa.net/download.php?id=11858&format=gabc&elem=1',
  },
  {
    text: 'Accipite Spiritum',
    href: 'https://gregobase.selapa.net/download.php?id=11829&format=gabc',
  },
  {
    text: 'Accipite Spiritum Sanctum',
    href: 'https://gregobase.selapa.net/download.php?id=2375&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Domini',
    href: 'https://gregobase.selapa.net/download.php?id=3119&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Domini replevit',
    href: 'https://gregobase.selapa.net/download.php?id=11870&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Paraclitus',
    href: 'https://gregobase.selapa.net/download.php?id=12731&format=gabc&elem=1',
  },
  {
    text: 'Repleti sunt omnes',
    href: 'https://gregobase.selapa.net/download.php?id=12827&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Paraclitus',
    href: 'https://gregobase.selapa.net/download.php?id=753&format=gabc&elem=1',
  },
  {
    text: 'Repleti sunt',
    href: 'https://gregobase.selapa.net/download.php?id=3057&format=gabc&elem=1',
  },
  {
    text: 'Hodie completi sunt',
    href: 'https://gregobase.selapa.net/download.php?id=2249&format=gabc&elem=1',
  },
  {
    text: 'Hodie completi sunt dies',
    href: 'https://gregobase.selapa.net/download.php?id=12430&format=gabc&elem=1',
  },
  {
    text: 'Sic Deus dilexit',
    href: 'https://gregobase.selapa.net/download.php?id=11948&format=gabc',
  },
  {
    text: 'Si quis diligit me',
    href: 'https://gregobase.selapa.net/download.php?id=2899&format=gabc&elem=1',
  },
  {
    text: 'Si quis diligit me',
    href: 'https://gregobase.selapa.net/download.php?id=13085&format=gabc&elem=1',
  },
  {
    text: 'Ego sum ostium',
    href: 'https://gregobase.selapa.net/download.php?id=12812&format=gabc',
  },
  {
    text: 'Pacem relinquo vobis',
    href: 'https://gregobase.selapa.net/download.php?id=2864&format=gabc&elem=1',
  },
  {
    text: 'Pacem relinquo vobis',
    href: 'https://gregobase.selapa.net/download.php?id=13128&format=gabc&elem=1',
  },
  {
    text: 'Ego sum panis vivus dicit',
    href: 'https://gregobase.selapa.net/download.php?id=12949&format=gabc',
  },
  {
    text: 'Ego sum panis vivus',
    href: 'https://gregobase.selapa.net/download.php?id=2047&format=gabc&elem=1',
  },
  {
    text: 'Ego sum panis vivus ... et panis',
    href: 'https://gregobase.selapa.net/download.php?id=12391&format=gabc',
  },
  {
    text: 'Convocatis Jesus duodecim',
    href: 'https://gregobase.selapa.net/download.php?id=12178&format=gabc',
  },
  {
    text: 'Spiritus qui',
    href: 'https://gregobase.selapa.net/download.php?id=2574&format=gabc&elem=1',
  },
  {
    text: 'Spiritus qui a Patre',
    href: 'https://gregobase.selapa.net/download.php?id=12478&format=gabc',
  },
  {
    text: 'Paraclitus autem Spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=11820&format=gabc',
  },
  {
    text: 'Dixit Jesus: Ut sciatis',
    href: 'https://gregobase.selapa.net/download.php?id=13321&format=gabc',
  },
  {
    text: 'Paraclitus autem',
    href: 'https://gregobase.selapa.net/download.php?id=2488&format=gabc&elem=1',
  },
  {
    text: 'Caritas Dei diffusa',
    href: 'https://gregobase.selapa.net/download.php?id=12491&format=gabc',
  },
  {
    text: 'Jam sol recedit',
    href: 'https://gregobase.selapa.net/download.php?id=12100&format=gabc',
  },
  {
    text: 'Jam sol recedit igneus (Blessed Trinity)',
    href: 'https://gregobase.selapa.net/download.php?id=2018&format=gabc&elem=1',
  },
  {
    text: 'Gratias tibi Deus',
    href: 'https://gregobase.selapa.net/download.php?id=12574&format=gabc&elem=1',
  },
  {
    text: 'Gratias tibi Deus',
    href: 'https://gregobase.selapa.net/download.php?id=2935&format=gabc&elem=1',
  },
  {
    text: 'Loquere Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2515&format=gabc&elem=1',
  },
  {
    text: 'Loquere Domine',
    href: 'https://gregobase.selapa.net/download.php?id=13322&format=gabc&elem=1',
  },
  {
    text: 'Gloria tibi Trinitas',
    href: 'https://gregobase.selapa.net/download.php?id=12014&format=gabc&elem=1',
  },
  {
    text: 'Laus et perennis gloria',
    href: 'https://gregobase.selapa.net/download.php?id=12635&format=gabc&elem=1',
  },
  {
    text: 'Gloria laudis resonet',
    href: 'https://gregobase.selapa.net/download.php?id=12779&format=gabc&elem=1',
  },
  {
    text: 'Gloria tibi Trinitas',
    href: 'https://gregobase.selapa.net/download.php?id=2284&format=gabc&elem=1',
  },
  {
    text: 'Laus et perennis gloria',
    href: 'https://gregobase.selapa.net/download.php?id=2475&format=gabc&elem=1',
  },
  {
    text: 'Gloria laudis resonet',
    href: 'https://gregobase.selapa.net/download.php?id=2434&format=gabc&elem=1',
  },
  {
    text: 'Laus Deo Patri',
    href: 'https://gregobase.selapa.net/download.php?id=12112&format=gabc&elem=1',
  },
  {
    text: 'Ex quo omnia',
    href: 'https://gregobase.selapa.net/download.php?id=12978&format=gabc&elem=1',
  },
  {
    text: 'Laus Deo Patri',
    href: 'https://gregobase.selapa.net/download.php?id=2296&format=gabc&elem=1',
  },
  {
    text: 'Ex quo omnia',
    href: 'https://gregobase.selapa.net/download.php?id=2650&format=gabc&elem=1',
  },
  {
    text: 'Benedicta sit creatrix',
    href: 'https://gregobase.selapa.net/download.php?id=12637&format=gabc&elem=1',
  },
  {
    text: 'Tu Trinitatis Unitas',
    href: 'https://gregobase.selapa.net/download.php?id=13227&format=gabc',
  },
  {
    text: 'Benedicta sit creatrix',
    href: 'https://gregobase.selapa.net/download.php?id=2403&format=gabc&elem=1',
  },
  {
    text: 'Estote ergo misericordes',
    href: 'https://gregobase.selapa.net/download.php?id=12548&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Patrem',
    href: 'https://gregobase.selapa.net/download.php?id=13081&format=gabc&elem=1',
  },
  {
    text: 'Estote ergo misericordes',
    href: 'https://gregobase.selapa.net/download.php?id=2478&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Patrem',
    href: 'https://gregobase.selapa.net/download.php?id=3118&format=gabc&elem=1',
  },
  {
    text: 'Benedictus es Domine',
    href: 'https://gregobase.selapa.net/download.php?id=11876&format=gabc&elem=1',
  },
  {
    text: 'Verbo Domini caeli',
    href: 'https://gregobase.selapa.net/download.php?id=12923&format=gabc',
  },
  {
    text: 'Benedictus es Domine',
    href: 'https://gregobase.selapa.net/download.php?id=3176&format=gabc&elem=1',
  },
  {
    text: 'Verbo Domini',
    href: 'https://gregobase.selapa.net/download.php?id=3086&format=gabc&elem=1',
  },
  {
    text: 'Te Deum Patrem ingenitum',
    href: 'https://gregobase.selapa.net/download.php?id=12437&format=gabc',
  },
  {
    text: 'Nolite judicare',
    href: 'https://gregobase.selapa.net/download.php?id=12985&format=gabc&elem=1',
  },
  {
    text: 'Te Deum Patrem',
    href: 'https://gregobase.selapa.net/download.php?id=2759&format=gabc&elem=1',
  },
  {
    text: 'Nolite judicare',
    href: 'https://gregobase.selapa.net/download.php?id=2053&format=gabc&elem=1',
  },
  {
    text: 'Miserator Dominus escam',
    href: 'https://gregobase.selapa.net/download.php?id=11835&format=gabc',
  },
  {
    text: 'Sacerdos in aeternum',
    href: 'https://gregobase.selapa.net/download.php?id=13259&format=gabc&elem=1',
  },
  {
    text: 'Sacerdos in aeternum',
    href: 'https://gregobase.selapa.net/download.php?id=2546&format=gabc&elem=1',
  },
  {
    text: 'Miserator Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2459&format=gabc&elem=1',
  },
  {
    text: 'Qui pacem ponit fines',
    href: 'https://gregobase.selapa.net/download.php?id=11842&format=gabc',
  },
  {
    text: 'Sicut novellae olivarum',
    href: 'https://gregobase.selapa.net/download.php?id=11958&format=gabc',
  },
  {
    text: 'Calicem salutaris ... et sacrificabo',
    href: 'https://gregobase.selapa.net/download.php?id=12509&format=gabc',
  },
  {
    text: 'Calicem salutaris accipiam et sacrificabo',
    href: 'https://gregobase.selapa.net/download.php?id=1877&format=gabc&elem=1',
  },
  {
    text: 'Sicut novellae',
    href: 'https://gregobase.selapa.net/download.php?id=1921&format=gabc&elem=1',
  },
  {
    text: 'Qui pacem ponit',
    href: 'https://gregobase.selapa.net/download.php?id=2339&format=gabc&elem=1',
  },
  {
    text: 'Pange lingua... Corporis',
    href: 'https://gregobase.selapa.net/download.php?id=1310&format=gabc&elem=1',
  },
  {
    text: 'O quam suavis',
    href: 'https://gregobase.selapa.net/download.php?id=2826&format=gabc&elem=1',
  },
  {
    text: 'O quam suavis est',
    href: 'https://gregobase.selapa.net/download.php?id=12557&format=gabc&elem=1',
  },
  {
    text: 'Angelorum esca',
    href: 'https://gregobase.selapa.net/download.php?id=11776&format=gabc&elem=1',
  },
  {
    text: 'Sapientia aedificavit ... miscuit',
    href: 'https://gregobase.selapa.net/download.php?id=12340&format=gabc',
  },
  {
    text: 'Pinguis est panis',
    href: 'https://gregobase.selapa.net/download.php?id=12884&format=gabc',
  },
  {
    text: 'Angelorum esca',
    href: 'https://gregobase.selapa.net/download.php?id=2731&format=gabc&elem=1',
  },
  {
    text: 'Pinguis est',
    href: 'https://gregobase.selapa.net/download.php?id=2057&format=gabc&elem=1',
  },
  {
    text: 'Verbum supernum',
    href: 'https://gregobase.selapa.net/download.php?id=12107&format=gabc',
  },
  {
    text: 'Vincenti dabo manna',
    href: 'https://gregobase.selapa.net/download.php?id=13297&format=gabc',
  },
  {
    text: 'Sacerdotes sancti',
    href: 'https://gregobase.selapa.net/download.php?id=13349&format=gabc&elem=1',
  },
  {
    text: 'Sacerdotes sancti',
    href: 'https://gregobase.selapa.net/download.php?id=2572&format=gabc&elem=1',
  },
  {
    text: 'Vincenti',
    href: 'https://gregobase.selapa.net/download.php?id=2744&format=gabc&elem=1',
  },
  {
    text: 'Ego sum panis (Corp. Chr.)',
    href: 'https://gregobase.selapa.net/download.php?id=11844&format=gabc',
  },
  {
    text: 'Ego sum panis vivus',
    href: 'https://gregobase.selapa.net/download.php?id=2684&format=gabc&elem=1',
  },
  {
    text: 'Cibavit illos',
    href: 'https://gregobase.selapa.net/download.php?id=12009&format=gabc&elem=1',
  },
  {
    text: 'Panem caeli dedit',
    href: 'https://gregobase.selapa.net/download.php?id=12349&format=gabc',
  },
  {
    text: 'Panem Caeli',
    href: 'https://gregobase.selapa.net/download.php?id=3175&format=gabc&elem=1',
  },
  {
    text: 'Cibavit illos',
    href: 'https://gregobase.selapa.net/download.php?id=3125&format=gabc&elem=1',
  },
  {
    text: 'O sacrum convivium',
    href: 'https://gregobase.selapa.net/download.php?id=13329&format=gabc&elem=1',
  },
  {
    text: 'Educas panem de terra',
    href: 'https://gregobase.selapa.net/download.php?id=3100&format=gabc&elem=1',
  },
  {
    text: 'Educas panem',
    href: 'https://gregobase.selapa.net/download.php?id=11945&format=gabc',
  },
  {
    text: 'O sacrum convivium',
    href: 'https://gregobase.selapa.net/download.php?id=2299&format=gabc&elem=1',
  },
  {
    text: 'Puer Samuel',
    href: 'https://gregobase.selapa.net/download.php?id=11774&format=gabc&elem=1',
  },
  {
    text: 'Puer Samuel',
    href: 'https://gregobase.selapa.net/download.php?id=2957&format=gabc&elem=1',
  },
  {
    text: 'Homo quidam fecit',
    href: 'https://gregobase.selapa.net/download.php?id=12740&format=gabc',
  },
  {
    text: 'Homo quidam fecit coenam magnam',
    href: 'https://gregobase.selapa.net/download.php?id=2330&format=gabc&elem=1',
  },
  {
    text: 'Exi cito in plateas',
    href: 'https://gregobase.selapa.net/download.php?id=11957&format=gabc&elem=1',
  },
  {
    text: 'Exi cito in plateas',
    href: 'https://gregobase.selapa.net/download.php?id=1929&format=gabc&elem=1',
  },
  {
    text: 'Misericors et miserator',
    href: 'https://gregobase.selapa.net/download.php?id=13194&format=gabc&elem=1',
  },
  {
    text: 'Suavi jugo tuo',
    href: 'https://gregobase.selapa.net/download.php?id=13239&format=gabc',
  },
  {
    text: 'Misericors et miserator',
    href: 'https://gregobase.selapa.net/download.php?id=1936&format=gabc&elem=1',
  },
  {
    text: 'Exortum est',
    href: 'https://gregobase.selapa.net/download.php?id=12096&format=gabc',
  },
  {
    text: 'Quid retribuam',
    href: 'https://gregobase.selapa.net/download.php?id=13317&format=gabc&elem=1',
  },
  {
    text: 'Exortum est (Sacred Heart)',
    href: 'https://gregobase.selapa.net/download.php?id=2670&format=gabc&elem=1',
  },
  {
    text: 'Quid retribuam',
    href: 'https://gregobase.selapa.net/download.php?id=2608&format=gabc&elem=1',
  },
  {
    text: 'En ut superba criminum',
    href: 'https://gregobase.selapa.net/download.php?id=11783&format=gabc',
  },
  {
    text: 'Apud Dominum propitiatio',
    href: 'https://gregobase.selapa.net/download.php?id=12252&format=gabc&elem=1',
  },
  {
    text: 'Apud Dominum propitiatio',
    href: 'https://gregobase.selapa.net/download.php?id=2322&format=gabc&elem=1',
  },
  {
    text: 'Ignem',
    href: 'https://gregobase.selapa.net/download.php?id=12584&format=gabc&elem=1',
  },
  {
    text: 'Ignem',
    href: 'https://gregobase.selapa.net/download.php?id=1965&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Sacratis. Cord. Jesu)',
    href: 'https://gregobase.selapa.net/download.php?id=12145&format=gabc',
  },
  {
    text: 'Unus militum',
    href: 'https://gregobase.selapa.net/download.php?id=1826&format=gabc&elem=1',
  },
  {
    text: 'Unus militum',
    href: 'https://gregobase.selapa.net/download.php?id=11926&format=gabc&elem=1',
  },
  {
    text: 'Fili praebe mihi',
    href: 'https://gregobase.selapa.net/download.php?id=11758&format=gabc',
  },
  {
    text: 'Venite ad me',
    href: 'https://gregobase.selapa.net/download.php?id=12023&format=gabc&elem=1',
  },
  {
    text: 'In caritate perpetua',
    href: 'https://gregobase.selapa.net/download.php?id=12093&format=gabc',
  },
  {
    text: 'Stans Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=13231&format=gabc&elem=1',
  },
  {
    text: 'Stans Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=2969&format=gabc&elem=1',
  },
  {
    text: 'In caritate',
    href: 'https://gregobase.selapa.net/download.php?id=2255&format=gabc&elem=1',
  },
  {
    text: 'Venite ad me',
    href: 'https://gregobase.selapa.net/download.php?id=1892&format=gabc&elem=1',
  },
  {
    text: 'Fili praebe',
    href: 'https://gregobase.selapa.net/download.php?id=2013&format=gabc&elem=1',
  },
  {
    text: 'Cor arca legem continens',
    href: 'https://gregobase.selapa.net/download.php?id=12454&format=gabc&elem=1',
  },
  {
    text: 'Cor arca legem continens',
    href: 'https://gregobase.selapa.net/download.php?id=2391&format=gabc&elem=1',
  },
  {
    text: 'Facta sunt',
    href: 'https://gregobase.selapa.net/download.php?id=1842&format=gabc&elem=1',
  },
  {
    text: 'Facta sunt enim haec',
    href: 'https://gregobase.selapa.net/download.php?id=12025&format=gabc&elem=1',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (In Sacratis. Cordi. Jesu)',
    href: 'https://gregobase.selapa.net/download.php?id=13083&format=gabc',
  },
  {
    text: 'Tollite jugum meum',
    href: 'https://gregobase.selapa.net/download.php?id=12030&format=gabc',
  },
  {
    text: 'Ego dixi Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12729&format=gabc&elem=1',
  },
  {
    text: 'Tollite jugum',
    href: 'https://gregobase.selapa.net/download.php?id=3216&format=gabc&elem=1',
  },
  {
    text: 'Ego dixi Domine',
    href: 'https://gregobase.selapa.net/download.php?id=3060&format=gabc&elem=1',
  },
  {
    text: 'Memoriam fecit',
    href: 'https://gregobase.selapa.net/download.php?id=13310&format=gabc&elem=1',
  },
  {
    text: 'Memoriam fecit',
    href: 'https://gregobase.selapa.net/download.php?id=3152&format=gabc&elem=1',
  },
  {
    text: 'Ad Jesum autem cum venissent.',
    href: 'https://gregobase.selapa.net/download.php?id=12823&format=gabc',
  },
  {
    text: 'Ad Jesum autem',
    href: 'https://gregobase.selapa.net/download.php?id=2519&format=gabc&elem=1',
  },
  {
    text: 'Cognoverunt omnes',
    href: 'https://gregobase.selapa.net/download.php?id=2346&format=gabc&elem=1',
  },
  {
    text: 'Cognoverunt omnes',
    href: 'https://gregobase.selapa.net/download.php?id=13008&format=gabc&elem=1',
  },
  {
    text: 'Quis ex vobis homo',
    href: 'https://gregobase.selapa.net/download.php?id=13063&format=gabc',
  },
  {
    text: 'Quae mulier',
    href: 'https://gregobase.selapa.net/download.php?id=1847&format=gabc&elem=1',
  },
  {
    text: 'Quae mulier habens',
    href: 'https://gregobase.selapa.net/download.php?id=13271&format=gabc&elem=1',
  },
  {
    text: 'Praevaluit David',
    href: 'https://gregobase.selapa.net/download.php?id=11933&format=gabc&elem=1',
  },
  {
    text: 'Praevaluit David',
    href: 'https://gregobase.selapa.net/download.php?id=2533&format=gabc&elem=1',
  },
  {
    text: 'Montes Gelboe',
    href: 'https://gregobase.selapa.net/download.php?id=2172&format=gabc&elem=1',
  },
  {
    text: 'Montes Gelboe',
    href: 'https://gregobase.selapa.net/download.php?id=11793&format=gabc&elem=1',
  },
  {
    text: 'Unxerunt Salomonem',
    href: 'https://gregobase.selapa.net/download.php?id=11746&format=gabc&elem=1',
  },
  {
    text: 'Exaudisti Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12337&format=gabc&elem=1',
  },
  {
    text: 'Obsecro Domine aufer',
    href: 'https://gregobase.selapa.net/download.php?id=2207&format=gabc&elem=1',
  },
  {
    text: 'Obsecro Domine aufer',
    href: 'https://gregobase.selapa.net/download.php?id=12038&format=gabc&elem=1',
  },
  {
    text: 'Unxerunt Salomonem',
    href: 'https://gregobase.selapa.net/download.php?id=1970&format=gabc&elem=1',
  },
  {
    text: 'Exaudisti Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2946&format=gabc&elem=1',
  },
  {
    text: 'Fecit Joas rectum',
    href: 'https://gregobase.selapa.net/download.php?id=12086&format=gabc',
  },
  {
    text: 'Dum tolleret Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12308&format=gabc&elem=1',
  },
  {
    text: 'Dum tolleret Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=1935&format=gabc&elem=1',
  },
  {
    text: 'Fecit Joas',
    href: 'https://gregobase.selapa.net/download.php?id=2030&format=gabc&elem=1',
  },
  {
    text: 'Sapientia aedificavit ... excidit',
    href: 'https://gregobase.selapa.net/download.php?id=11980&format=gabc',
  },
  {
    text: 'Obsecro Domine memento',
    href: 'https://gregobase.selapa.net/download.php?id=12828&format=gabc&elem=1',
  },
  {
    text: 'Obsecro Domine memento',
    href: 'https://gregobase.selapa.net/download.php?id=1946&format=gabc&elem=1',
  },
  {
    text: 'Sapientia aedificavit... excidit',
    href: 'https://gregobase.selapa.net/download.php?id=2639&format=gabc&elem=1',
  },
  {
    text: 'Ego in altissimis',
    href: 'https://gregobase.selapa.net/download.php?id=12988&format=gabc&elem=1',
  },
  {
    text: 'Omnis sapientia',
    href: 'https://gregobase.selapa.net/download.php?id=13270&format=gabc&elem=1',
  },
  {
    text: 'Rerum deus tenax vigor (In Pentecoste)',
    href: 'https://gregobase.selapa.net/download.php?id=19258&format=gabc',
  },
  {
    text: 'Ego in altissimis',
    href: 'https://gregobase.selapa.net/download.php?id=2716&format=gabc&elem=1',
  },
  {
    text: 'Omnis sapientia',
    href: 'https://gregobase.selapa.net/download.php?id=2423&format=gabc&elem=1',
  },
  {
    text: 'Observa fili praecepta',
    href: 'https://gregobase.selapa.net/download.php?id=12090&format=gabc',
  },
  {
    text: 'Sapientia clamitat',
    href: 'https://gregobase.selapa.net/download.php?id=12712&format=gabc&elem=1',
  },
  {
    text: 'Sapientia clamitat',
    href: 'https://gregobase.selapa.net/download.php?id=2714&format=gabc&elem=1',
  },
  {
    text: 'Observa fili',
    href: 'https://gregobase.selapa.net/download.php?id=2394&format=gabc&elem=1',
  },
  {
    text: 'Cum audisset Job',
    href: 'https://gregobase.selapa.net/download.php?id=12209&format=gabc&elem=1',
  },
  {
    text: 'In omnibus his',
    href: 'https://gregobase.selapa.net/download.php?id=13184&format=gabc&elem=1',
  },
  {
    text: 'Cum audisset Job',
    href: 'https://gregobase.selapa.net/download.php?id=2175&format=gabc&elem=1',
  },
  {
    text: 'In omnibus his',
    href: 'https://gregobase.selapa.net/download.php?id=2891&format=gabc&elem=1',
  },
  {
    text: 'Hoc genus daemoniorum',
    href: 'https://gregobase.selapa.net/download.php?id=11996&format=gabc',
  },
  {
    text: 'Ne reminiscaris Domine',
    href: 'https://gregobase.selapa.net/download.php?id=13328&format=gabc',
  },
  {
    text: 'Ne reminiscaris... mea',
    href: 'https://gregobase.selapa.net/download.php?id=1959&format=gabc&elem=1',
  },
  {
    text: 'Mulier quae erat ... stans',
    href: 'https://gregobase.selapa.net/download.php?id=13014&format=gabc',
  },
  {
    text: 'Domine Rex omnipotens',
    href: 'https://gregobase.selapa.net/download.php?id=12079&format=gabc&elem=1',
  },
  {
    text: 'Adonai Domine Deus',
    href: 'https://gregobase.selapa.net/download.php?id=11904&format=gabc',
  },
  {
    text: 'Domine Rex omnipotens',
    href: 'https://gregobase.selapa.net/download.php?id=2272&format=gabc&elem=1',
  },
  {
    text: 'Lugebat autem Judam',
    href: 'https://gregobase.selapa.net/download.php?id=11754&format=gabc',
  },
  {
    text: 'Refulsit sol in clypeos',
    href: 'https://gregobase.selapa.net/download.php?id=11884&format=gabc',
  },
  {
    text: 'Adaperiat Dominus cor vestrum',
    href: 'https://gregobase.selapa.net/download.php?id=1858&format=gabc&elem=1',
  },
  {
    text: 'Adaperiat Dominus cor',
    href: 'https://gregobase.selapa.net/download.php?id=12627&format=gabc&elem=1',
  },
  {
    text: 'Refulsit sol',
    href: 'https://gregobase.selapa.net/download.php?id=2502&format=gabc&elem=1',
  },
  {
    text: 'Tua est potentia',
    href: 'https://gregobase.selapa.net/download.php?id=12290&format=gabc&elem=1',
  },
  {
    text: 'Exaudiat Dominus orationes',
    href: 'https://gregobase.selapa.net/download.php?id=12382&format=gabc',
  },
  {
    text: 'Exaudiat Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=1895&format=gabc&elem=1',
  },
  {
    text: 'Tua est potentia',
    href: 'https://gregobase.selapa.net/download.php?id=2161&format=gabc&elem=1',
  },
  {
    text: 'Vidi Dominum sedentem',
    href: 'https://gregobase.selapa.net/download.php?id=11810&format=gabc',
  },
  {
    text: 'Aspice Domine quia',
    href: 'https://gregobase.selapa.net/download.php?id=12260&format=gabc',
  },
  {
    text: 'Vidi Dominum sedentem (Ant)',
    href: 'https://gregobase.selapa.net/download.php?id=2327&format=gabc&elem=1',
  },
  {
    text: 'Aspice Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2265&format=gabc&elem=1',
  },
  {
    text: 'Qui caelorum contines',
    href: 'https://gregobase.selapa.net/download.php?id=12616&format=gabc',
  },
  {
    text: 'Muro tuo',
    href: 'https://gregobase.selapa.net/download.php?id=1844&format=gabc&elem=1',
  },
  {
    text: 'Muro tuo inexpugnabili',
    href: 'https://gregobase.selapa.net/download.php?id=12953&format=gabc&elem=1',
  },
  {
    text: 'Qui caelorum',
    href: 'https://gregobase.selapa.net/download.php?id=1934&format=gabc&elem=1',
  },
  {
    text: 'Super muros tuos',
    href: 'https://gregobase.selapa.net/download.php?id=12567&format=gabc&elem=1',
  },
  {
    text: 'Super muros tuos',
    href: 'https://gregobase.selapa.net/download.php?id=1940&format=gabc&elem=1',
  },
  {
    text: 'Praeceptor',
    href: 'https://gregobase.selapa.net/download.php?id=11901&format=gabc&elem=1',
  },
  {
    text: 'Ascendens Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=2496&format=gabc&elem=1',
  },
  {
    text: 'Ascendens Jesus in navim',
    href: 'https://gregobase.selapa.net/download.php?id=12423&format=gabc&elem=1',
  },
  {
    text: 'Praeceptor',
    href: 'https://gregobase.selapa.net/download.php?id=2317&format=gabc&elem=1',
  },
  {
    text: 'Audistis quia dictum',
    href: 'https://gregobase.selapa.net/download.php?id=2279&format=gabc&elem=1',
  },
  {
    text: 'Si offers munus',
    href: 'https://gregobase.selapa.net/download.php?id=2479&format=gabc&elem=1',
  },
  {
    text: 'Si offers munus tuum',
    href: 'https://gregobase.selapa.net/download.php?id=12129&format=gabc',
  },
  {
    text: 'Audistis quia dictum est',
    href: 'https://gregobase.selapa.net/download.php?id=12493&format=gabc',
  },
  {
    text: 'Cum turba multa',
    href: 'https://gregobase.selapa.net/download.php?id=2794&format=gabc&elem=1',
  },
  {
    text: 'Cum turba multa esset',
    href: 'https://gregobase.selapa.net/download.php?id=12634&format=gabc',
  },
  {
    text: 'Misereor super turbam',
    href: 'https://gregobase.selapa.net/download.php?id=2424&format=gabc&elem=1',
  },
  {
    text: 'Attendite a falsis',
    href: 'https://gregobase.selapa.net/download.php?id=12877&format=gabc&elem=1',
  },
  {
    text: 'Attendite a falsis',
    href: 'https://gregobase.selapa.net/download.php?id=2433&format=gabc&elem=1',
  },
  {
    text: 'Misereor super turbam',
    href: 'https://gregobase.selapa.net/download.php?id=12805&format=gabc&elem=1',
  },
  {
    text: 'Non potest arbor bona',
    href: 'https://gregobase.selapa.net/download.php?id=2082&format=gabc&elem=1',
  },
  {
    text: 'Ait dominus villico',
    href: 'https://gregobase.selapa.net/download.php?id=13291&format=gabc',
  },
  {
    text: 'Non potest arbor bona',
    href: 'https://gregobase.selapa.net/download.php?id=13268&format=gabc&elem=1',
  },
  {
    text: 'Quid faciam',
    href: 'https://gregobase.selapa.net/download.php?id=2128&format=gabc&elem=1',
  },
  {
    text: 'Cum appropinquaret Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12522&format=gabc',
  },
  {
    text: 'Quid faciam quia dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12659&format=gabc',
  },
  {
    text: 'Cum appropinquaret',
    href: 'https://gregobase.selapa.net/download.php?id=2914&format=gabc&elem=1',
  },
  {
    text: 'Scriptum est enim quia',
    href: 'https://gregobase.selapa.net/download.php?id=12990&format=gabc&elem=1',
  },
  {
    text: 'Scriptum est enim quia',
    href: 'https://gregobase.selapa.net/download.php?id=2624&format=gabc&elem=1',
  },
  {
    text: 'Scriptum est enim quia',
    href: 'https://gregobase.selapa.net/download.php?id=12263&format=gabc&elem=1',
  },
  {
    text: 'Stans a longe publicanus',
    href: 'https://gregobase.selapa.net/download.php?id=13309&format=gabc',
  },
  {
    text: 'Stans a longe',
    href: 'https://gregobase.selapa.net/download.php?id=2043&format=gabc&elem=1',
  },
  {
    text: 'Descendit hic',
    href: 'https://gregobase.selapa.net/download.php?id=2428&format=gabc&elem=1',
  },
  {
    text: 'Descendit hic justificatus',
    href: 'https://gregobase.selapa.net/download.php?id=12969&format=gabc',
  },
  {
    text: 'Magister quid faciendo',
    href: 'https://gregobase.selapa.net/download.php?id=12244&format=gabc&elem=1',
  },
  {
    text: 'Dum transiret Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=13186&format=gabc&elem=1',
  },
  {
    text: 'Dum transiret Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2477&format=gabc&elem=1',
  },
  {
    text: 'Bene omnia',
    href: 'https://gregobase.selapa.net/download.php?id=2229&format=gabc&elem=1',
  },
  {
    text: 'Magister quid faciendo',
    href: 'https://gregobase.selapa.net/download.php?id=2524&format=gabc&elem=1',
  },
  {
    text: 'Bene omnia fecit',
    href: 'https://gregobase.selapa.net/download.php?id=12400&format=gabc',
  },
  {
    text: 'Homo quidam descendebat',
    href: 'https://gregobase.selapa.net/download.php?id=1928&format=gabc&elem=1',
  },
  {
    text: 'Homo quidam descendebat',
    href: 'https://gregobase.selapa.net/download.php?id=11903&format=gabc&elem=1',
  },
  {
    text: 'Dum intraret Jesus quoddam',
    href: 'https://gregobase.selapa.net/download.php?id=13286&format=gabc',
  },
  {
    text: 'Dum intraret',
    href: 'https://gregobase.selapa.net/download.php?id=2218&format=gabc&elem=1',
  },
  {
    text: 'Unus autem ex illis',
    href: 'https://gregobase.selapa.net/download.php?id=2647&format=gabc&elem=1',
  },
  {
    text: 'Nolite solliciti esse',
    href: 'https://gregobase.selapa.net/download.php?id=12684&format=gabc',
  },
  {
    text: 'Unus autem ex illis',
    href: 'https://gregobase.selapa.net/download.php?id=12466&format=gabc&elem=1',
  },
  {
    text: 'Quaerite primum',
    href: 'https://gregobase.selapa.net/download.php?id=1995&format=gabc&elem=1',
  },
  {
    text: 'Ibat Jesus in civitatem',
    href: 'https://gregobase.selapa.net/download.php?id=12554&format=gabc',
  },
  {
    text: 'Ibat Jesus in civitatem',
    href: 'https://gregobase.selapa.net/download.php?id=12992&format=gabc',
  },
  {
    text: 'Quaerite primum',
    href: 'https://gregobase.selapa.net/download.php?id=11981&format=gabc&elem=1',
  },
  {
    text: 'Propheta magnus',
    href: 'https://gregobase.selapa.net/download.php?id=2773&format=gabc&elem=1',
  },
  {
    text: 'Cum intraret Jesus in domum',
    href: 'https://gregobase.selapa.net/download.php?id=11983&format=gabc',
  },
  {
    text: 'Propheta magnus',
    href: 'https://gregobase.selapa.net/download.php?id=12479&format=gabc&elem=1',
  },
  {
    text: 'Propheta magnus',
    href: 'https://gregobase.selapa.net/download.php?id=12792&format=gabc&elem=1',
  },
  {
    text: 'Cum vocatus fueris',
    href: 'https://gregobase.selapa.net/download.php?id=1852&format=gabc&elem=1',
  },
  {
    text: 'Cum vocatus fueris ad nuptias',
    href: 'https://gregobase.selapa.net/download.php?id=12555&format=gabc&elem=1',
  },
  {
    text: 'Magister quod est',
    href: 'https://gregobase.selapa.net/download.php?id=12006&format=gabc',
  },
  {
    text: 'Quid vobis videtur',
    href: 'https://gregobase.selapa.net/download.php?id=2881&format=gabc&elem=1',
  },
  {
    text: 'Quid vobis videtur de Christo',
    href: 'https://gregobase.selapa.net/download.php?id=12774&format=gabc',
  },
  {
    text: 'Dixit Dominus paralytico',
    href: 'https://gregobase.selapa.net/download.php?id=12889&format=gabc',
  },
  {
    text: 'Tulit ergo',
    href: 'https://gregobase.selapa.net/download.php?id=1828&format=gabc&elem=1',
  },
  {
    text: 'Tulit ergo paralyticus',
    href: 'https://gregobase.selapa.net/download.php?id=11775&format=gabc&elem=1',
  },
  {
    text: 'Dicite invitatis',
    href: 'https://gregobase.selapa.net/download.php?id=12177&format=gabc',
  },
  {
    text: 'Intravit autem rex',
    href: 'https://gregobase.selapa.net/download.php?id=2221&format=gabc&elem=1',
  },
  {
    text: 'Intravit autem rex',
    href: 'https://gregobase.selapa.net/download.php?id=13096&format=gabc&elem=1',
  },
  {
    text: 'Erat quidam regulus',
    href: 'https://gregobase.selapa.net/download.php?id=2219&format=gabc&elem=1',
  },
  {
    text: 'Cognovit autem',
    href: 'https://gregobase.selapa.net/download.php?id=1823&format=gabc&elem=1',
  },
  {
    text: 'Cognovit autem pater',
    href: 'https://gregobase.selapa.net/download.php?id=12118&format=gabc&elem=1',
  },
  {
    text: 'Dixit autem dominus servo',
    href: 'https://gregobase.selapa.net/download.php?id=12341&format=gabc',
  },
  {
    text: 'Dixit autem dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2356&format=gabc&elem=1',
  },
  {
    text: 'Serve nequam',
    href: 'https://gregobase.selapa.net/download.php?id=2688&format=gabc&elem=1',
  },
  {
    text: 'Dicebat enim intra se',
    href: 'https://gregobase.selapa.net/download.php?id=11930&format=gabc',
  },
  {
    text: 'Serve nequam',
    href: 'https://gregobase.selapa.net/download.php?id=12543&format=gabc&elem=1',
  },
  {
    text: 'Magister scimus quia verax es',
    href: 'https://gregobase.selapa.net/download.php?id=2929&format=gabc&elem=1',
  },
  {
    text: 'Reddite ergo',
    href: 'https://gregobase.selapa.net/download.php?id=2536&format=gabc&elem=1',
  },
  {
    text: 'Dicebat enim',
    href: 'https://gregobase.selapa.net/download.php?id=2389&format=gabc&elem=1',
  },
  {
    text: 'Reddite ergo quae sunt',
    href: 'https://gregobase.selapa.net/download.php?id=11873&format=gabc',
  },
  {
    text: 'At Jesus conversus',
    href: 'https://gregobase.selapa.net/download.php?id=2493&format=gabc&elem=1',
  },
  {
    text: 'At Jesus conversus',
    href: 'https://gregobase.selapa.net/download.php?id=11802&format=gabc&elem=1',
  },
  {
    text: 'Cum videritis abominationem',
    href: 'https://gregobase.selapa.net/download.php?id=12447&format=gabc',
  },
  {
    text: 'Cum videritis',
    href: 'https://gregobase.selapa.net/download.php?id=2484&format=gabc&elem=1',
  },
  {
    text: 'Amen dico vobis quia non',
    href: 'https://gregobase.selapa.net/download.php?id=2802&format=gabc&elem=1',
  },
  {
    text: 'Amen dico vobis quia non praeteribit',
    href: 'https://gregobase.selapa.net/download.php?id=11739&format=gabc&elem=1',
  },
  {
    text: 'Filiae Jerusalem venite',
    href: 'https://gregobase.selapa.net/download.php?id=11765&format=gabc&elem=1',
  },
  {
    text: 'Lux perpetua lucebit',
    href: 'https://gregobase.selapa.net/download.php?id=12701&format=gabc',
  },
  {
    text: 'Lux perpetua lucebit',
    href: 'https://gregobase.selapa.net/download.php?id=13210&format=gabc',
  },
  {
    text: 'Filiae Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=2680&format=gabc&elem=1',
  },
  {
    text: 'Filiae Jerusalem venite',
    href: 'https://gregobase.selapa.net/download.php?id=12236&format=gabc&elem=1',
  },
  {
    text: 'Iste Sanctus pro lege',
    href: 'https://gregobase.selapa.net/download.php?id=11741&format=gabc',
  },
  {
    text: 'Iste Sanctus pro lege',
    href: 'https://gregobase.selapa.net/download.php?id=11743&format=gabc',
  },
  {
    text: 'Sancti et justi in Domino',
    href: 'https://gregobase.selapa.net/download.php?id=11902&format=gabc',
  },
  {
    text: 'Sancti et justi in Domino',
    href: 'https://gregobase.selapa.net/download.php?id=11995&format=gabc',
  },
  {
    text: 'Iste Sanctus pro lege',
    href: 'https://gregobase.selapa.net/download.php?id=13158&format=gabc',
  },
  {
    text: 'Qui vult venire post me',
    href: 'https://gregobase.selapa.net/download.php?id=12048&format=gabc',
  },
  {
    text: 'Qui odit animam suam',
    href: 'https://gregobase.selapa.net/download.php?id=12071&format=gabc&elem=1',
  },
  {
    text: 'Qui odit animam suam',
    href: 'https://gregobase.selapa.net/download.php?id=12296&format=gabc&elem=1',
  },
  {
    text: 'Qui vult venire post me',
    href: 'https://gregobase.selapa.net/download.php?id=12331&format=gabc',
  },
  {
    text: 'Qui odit animam suam',
    href: 'https://gregobase.selapa.net/download.php?id=2855&format=gabc&elem=1',
  },
  {
    text: 'Vestri capilli capitis',
    href: 'https://gregobase.selapa.net/download.php?id=12212&format=gabc&elem=1',
  },
  {
    text: 'Istorum est enim regnum',
    href: 'https://gregobase.selapa.net/download.php?id=12463&format=gabc',
  },
  {
    text: 'Vestri capilli capitis',
    href: 'https://gregobase.selapa.net/download.php?id=12836&format=gabc&elem=1',
  },
  {
    text: 'Istorum est enim regnum',
    href: 'https://gregobase.selapa.net/download.php?id=13332&format=gabc',
  },
  {
    text: 'Gaudent in caelis',
    href: 'https://gregobase.selapa.net/download.php?id=1958&format=gabc&elem=1',
  },
  {
    text: 'Euge serve (Conf. Pont.)',
    href: 'https://gregobase.selapa.net/download.php?id=11839&format=gabc',
  },
  {
    text: 'Sacerdos et Pontifex',
    href: 'https://gregobase.selapa.net/download.php?id=12496&format=gabc',
  },
  {
    text: 'Amavit eum Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12384&format=gabc&elem=1',
  },
  {
    text: 'Dum esset summus pontifex',
    href: 'https://gregobase.selapa.net/download.php?id=1820&format=gabc&elem=1',
  },
  {
    text: 'Dum esset summus',
    href: 'https://gregobase.selapa.net/download.php?id=11787&format=gabc&elem=1',
  },
  {
    text: 'O Doctor optime',
    href: 'https://gregobase.selapa.net/download.php?id=1908&format=gabc&elem=1',
  },
  {
    text: 'Euge serve (Non Pont.)',
    href: 'https://gregobase.selapa.net/download.php?id=11834&format=gabc',
  },
  {
    text: 'Hic vir despiciens',
    href: 'https://gregobase.selapa.net/download.php?id=12068&format=gabc&elem=1',
  },
  {
    text: 'Euge serve bone (Conf. non Pont.)',
    href: 'https://gregobase.selapa.net/download.php?id=2808&format=gabc&elem=1',
  },
  {
    text: 'Hic vir despiciens',
    href: 'https://gregobase.selapa.net/download.php?id=2251&format=gabc&elem=1',
  },
  {
    text: 'Veni sponsa Christi (I Vesperis)',
    href: 'https://gregobase.selapa.net/download.php?id=2745&format=gabc&elem=1',
  },
  {
    text: 'Veni sponsa Christi (II Vesperis)',
    href: 'https://gregobase.selapa.net/download.php?id=2042&format=gabc&elem=1',
  },
  {
    text: 'Prudentes Virgines',
    href: 'https://gregobase.selapa.net/download.php?id=12550&format=gabc',
  },
  {
    text: 'Simile est ... homini negotiatori',
    href: 'https://gregobase.selapa.net/download.php?id=12921&format=gabc',
  },
  {
    text: 'Manum suam aperuit',
    href: 'https://gregobase.selapa.net/download.php?id=11979&format=gabc',
  },
  {
    text: 'Date ei de fructu',
    href: 'https://gregobase.selapa.net/download.php?id=13275&format=gabc&elem=1',
  },
  {
    text: 'Date ei de fructu',
    href: 'https://gregobase.selapa.net/download.php?id=2681&format=gabc&elem=1',
  },
  {
    text: 'Manum suam',
    href: 'https://gregobase.selapa.net/download.php?id=2275&format=gabc&elem=1',
  },
  {
    text: 'Beata Dei Genitrix Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=2810&format=gabc&elem=1',
  },
  {
    text: 'Beata Dei Genitrix Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=12223&format=gabc&elem=1',
  },
  {
    text: 'Beata Dei Genitrix Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=12269&format=gabc&elem=1',
  },
  {
    text: 'Crucifixus surrexit',
    href: 'https://gregobase.selapa.net/download.php?id=12127&format=gabc',
  },
  {
    text: 'Crucifixus surrexit',
    href: 'https://gregobase.selapa.net/download.php?id=12386&format=gabc',
  },
  {
    text: 'Crucifixus',
    href: 'https://gregobase.selapa.net/download.php?id=2642&format=gabc&elem=1',
  },
  {
    text: 'Unus ex duobus',
    href: 'https://gregobase.selapa.net/download.php?id=11756&format=gabc&elem=1',
  },
  {
    text: 'Salve Crux pretiosa',
    href: 'https://gregobase.selapa.net/download.php?id=12364&format=gabc&elem=1',
  },
  {
    text: 'Unus ex duobus',
    href: 'https://gregobase.selapa.net/download.php?id=1961&format=gabc&elem=1',
  },
  {
    text: 'Salve Crux pretiosa',
    href: 'https://gregobase.selapa.net/download.php?id=2880&format=gabc&elem=1',
  },
  {
    text: 'Beatus Andreas',
    href: 'https://gregobase.selapa.net/download.php?id=1822&format=gabc&elem=1',
  },
  {
    text: 'Beatus Andreas orabat',
    href: 'https://gregobase.selapa.net/download.php?id=12585&format=gabc&elem=1',
  },
  {
    text: 'Andreas Christi famulus',
    href: 'https://gregobase.selapa.net/download.php?id=2838&format=gabc&elem=1',
  },
  {
    text: 'Maximilla Christo amabilis',
    href: 'https://gregobase.selapa.net/download.php?id=2537&format=gabc&elem=1',
  },
  {
    text: 'Andreas Christi famulus',
    href: 'https://gregobase.selapa.net/download.php?id=13097&format=gabc&elem=1',
  },
  {
    text: 'Qui persequebantur justum',
    href: 'https://gregobase.selapa.net/download.php?id=2336&format=gabc&elem=1',
  },
  {
    text: 'Maximilla Christo amabilis',
    href: 'https://gregobase.selapa.net/download.php?id=13118&format=gabc&elem=1',
  },
  {
    text: 'Qui persequebantur justum',
    href: 'https://gregobase.selapa.net/download.php?id=12962&format=gabc&elem=1',
  },
  {
    text: 'Concede nobis hominem',
    href: 'https://gregobase.selapa.net/download.php?id=12195&format=gabc',
  },
  {
    text: 'Cum pervenisset beatus',
    href: 'https://gregobase.selapa.net/download.php?id=12605&format=gabc',
  },
  {
    text: 'Cum pervenisset beatus Andreas',
    href: 'https://gregobase.selapa.net/download.php?id=2576&format=gabc&elem=1',
  },
  {
    text: 'Beatam me dicent ... quia fecit.',
    href: 'https://gregobase.selapa.net/download.php?id=12900&format=gabc',
  },
  {
    text: 'Tota pulchra es Maria',
    href: 'https://gregobase.selapa.net/download.php?id=11950&format=gabc&elem=1',
  },
  {
    text: 'Vestimentum tuum',
    href: 'https://gregobase.selapa.net/download.php?id=12087&format=gabc&elem=1',
  },
  {
    text: 'Tu gloria Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=12655&format=gabc&elem=1',
  },
  {
    text: 'Tu gloria Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=12916&format=gabc&elem=1',
  },
  {
    text: 'Tota pulchra es Maria',
    href: 'https://gregobase.selapa.net/download.php?id=2922&format=gabc&elem=1',
  },
  {
    text: 'Vestimentum tuum',
    href: 'https://gregobase.selapa.net/download.php?id=2930&format=gabc&elem=1',
  },
  {
    text: 'Tu gloria Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=2747&format=gabc&elem=1',
  },
  {
    text: 'Benedicta es tu Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=11760&format=gabc',
  },
  {
    text: 'Benedicta es tu Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=13010&format=gabc',
  },
  {
    text: 'Trahe nos Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=13149&format=gabc&elem=1',
  },
  {
    text: 'Benedicta es tu',
    href: 'https://gregobase.selapa.net/download.php?id=2370&format=gabc&elem=1',
  },
  {
    text: 'Trahe nos Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=2078&format=gabc&elem=1',
  },
  {
    text: 'Ait Dominus Deus ad serpentem',
    href: 'https://gregobase.selapa.net/download.php?id=2152&format=gabc&elem=1',
  },
  {
    text: 'Ait Dominus Deus',
    href: 'https://gregobase.selapa.net/download.php?id=11772&format=gabc',
  },
  {
    text: 'Deus omnipotens praecinxit',
    href: 'https://gregobase.selapa.net/download.php?id=12881&format=gabc',
  },
  {
    text: 'Deus omnipotens',
    href: 'https://gregobase.selapa.net/download.php?id=3204&format=gabc&elem=1',
  },
  {
    text: 'In hoc cognovi',
    href: 'https://gregobase.selapa.net/download.php?id=13202&format=gabc&elem=1',
  },
  {
    text: 'In hoc cognovi',
    href: 'https://gregobase.selapa.net/download.php?id=3081&format=gabc&elem=1',
  },
  {
    text: 'Exaltabo te',
    href: 'https://gregobase.selapa.net/download.php?id=3069&format=gabc&elem=1',
  },
  {
    text: 'Exaltabo te',
    href: 'https://gregobase.selapa.net/download.php?id=12419&format=gabc&elem=1',
  },
  {
    text: 'Hodie egressa est',
    href: 'https://gregobase.selapa.net/download.php?id=12150&format=gabc&elem=1',
  },
  {
    text: 'Hodie egressa est',
    href: 'https://gregobase.selapa.net/download.php?id=2494&format=gabc&elem=1',
  },
  {
    text: 'In tua patientia',
    href: 'https://gregobase.selapa.net/download.php?id=12166&format=gabc&elem=1',
  },
  {
    text: 'In tua patientia',
    href: 'https://gregobase.selapa.net/download.php?id=1987&format=gabc&elem=1',
  },
  {
    text: 'Benedico... Filium',
    href: 'https://gregobase.selapa.net/download.php?id=11757&format=gabc&elem=1',
  },
  {
    text: 'Lucia Virgo quid a me',
    href: 'https://gregobase.selapa.net/download.php?id=12220&format=gabc',
  },
  {
    text: 'Per te Lucia Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=12886&format=gabc',
  },
  {
    text: 'Orante sancta Lucia',
    href: 'https://gregobase.selapa.net/download.php?id=12905&format=gabc&elem=1',
  },
  {
    text: 'Orante sancta Lucia',
    href: 'https://gregobase.selapa.net/download.php?id=2738&format=gabc&elem=1',
  },
  {
    text: 'Lucia virgo',
    href: 'https://gregobase.selapa.net/download.php?id=2240&format=gabc&elem=1',
  },
  {
    text: 'Per te Lucia',
    href: 'https://gregobase.selapa.net/download.php?id=1926&format=gabc&elem=1',
  },
  {
    text: 'Benedico... Filium',
    href: 'https://gregobase.selapa.net/download.php?id=2039&format=gabc&elem=1',
  },
  {
    text: 'Benedico te',
    href: 'https://gregobase.selapa.net/download.php?id=18210&format=gabc&elem=1',
  },
  {
    text: 'Soror mea Lucia',
    href: 'https://gregobase.selapa.net/download.php?id=12137&format=gabc&elem=1',
  },
  {
    text: 'Soror mea Lucia',
    href: 'https://gregobase.selapa.net/download.php?id=2704&format=gabc&elem=1',
  },
  {
    text: 'Columna es immobilis',
    href: 'https://gregobase.selapa.net/download.php?id=13242&format=gabc',
  },
  {
    text: 'Tanto pondere eam fixit',
    href: 'https://gregobase.selapa.net/download.php?id=12110&format=gabc',
  },
  {
    text: 'Tanto pondere',
    href: 'https://gregobase.selapa.net/download.php?id=2757&format=gabc&elem=1',
  },
  {
    text: 'Quia vidisti me',
    href: 'https://gregobase.selapa.net/download.php?id=12695&format=gabc&elem=1',
  },
  {
    text: 'Quia vidisti me',
    href: 'https://gregobase.selapa.net/download.php?id=13281&format=gabc&elem=1',
  },
  {
    text: 'Quia vidisti me',
    href: 'https://gregobase.selapa.net/download.php?id=2517&format=gabc&elem=1',
  },
  {
    text: 'Quodcumque in orbe',
    href: 'https://gregobase.selapa.net/download.php?id=11831&format=gabc&elem=1',
  },
  {
    text: 'Quodcumque in orbe',
    href: 'https://gregobase.selapa.net/download.php?id=8160&format=gabc&elem=1',
  },
  {
    text: 'Tu es pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=12681&format=gabc',
  },
  {
    text: 'Tu es pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=12920&format=gabc',
  },
  {
    text: 'Tu es pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=13030&format=gabc',
  },
  {
    text: 'Tu es Pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=2717&format=gabc&elem=1',
  },
  {
    text: 'Sancte Paule Apostole',
    href: 'https://gregobase.selapa.net/download.php?id=2937&format=gabc&elem=1',
  },
  {
    text: 'Beate Pastor Petre',
    href: 'https://gregobase.selapa.net/download.php?id=13160&format=gabc&elem=1',
  },
  {
    text: 'Beate Pastor Petre',
    href: 'https://gregobase.selapa.net/download.php?id=13301&format=gabc&elem=1',
  },
  {
    text: 'Beate Pastor Petre',
    href: 'https://gregobase.selapa.net/download.php?id=1988&format=gabc&elem=1',
  },
  {
    text: 'Quodcumque ligaveris',
    href: 'https://gregobase.selapa.net/download.php?id=12558&format=gabc&elem=1',
  },
  {
    text: 'Quodcumque ligaveris',
    href: 'https://gregobase.selapa.net/download.php?id=12928&format=gabc&elem=1',
  },
  {
    text: 'Quodcumque ligaveris',
    href: 'https://gregobase.selapa.net/download.php?id=2689&format=gabc&elem=1',
  },
  {
    text: 'Beata Agnes in medio flammarum',
    href: 'https://gregobase.selapa.net/download.php?id=2814&format=gabc&elem=1',
  },
  {
    text: 'Beata Agnes in medio',
    href: 'https://gregobase.selapa.net/download.php?id=12750&format=gabc&elem=1',
  },
  {
    text: 'Ingressa Agnes',
    href: 'https://gregobase.selapa.net/download.php?id=12416&format=gabc&elem=1',
  },
  {
    text: 'Mecum enim habeo',
    href: 'https://gregobase.selapa.net/download.php?id=12693&format=gabc',
  },
  {
    text: 'Ingressa Agnes',
    href: 'https://gregobase.selapa.net/download.php?id=2210&format=gabc&elem=1',
  },
  {
    text: 'Mecum enim',
    href: 'https://gregobase.selapa.net/download.php?id=2906&format=gabc&elem=1',
  },
  {
    text: 'Annulo suo',
    href: 'https://gregobase.selapa.net/download.php?id=1889&format=gabc&elem=1',
  },
  {
    text: 'Benedico... Filium',
    href: 'https://gregobase.selapa.net/download.php?id=11757&format=gabc&elem=1',
  },
  {
    text: 'Ecce quod concupivi',
    href: 'https://gregobase.selapa.net/download.php?id=12687&format=gabc',
  },
  {
    text: 'Benedico... Filium',
    href: 'https://gregobase.selapa.net/download.php?id=2039&format=gabc&elem=1',
  },
  {
    text: 'Congaudete',
    href: 'https://gregobase.selapa.net/download.php?id=1832&format=gabc&elem=1',
  },
  {
    text: 'Congaudete mecum',
    href: 'https://gregobase.selapa.net/download.php?id=12762&format=gabc&elem=1',
  },
  {
    text: 'Stans beata Agnes',
    href: 'https://gregobase.selapa.net/download.php?id=13142&format=gabc&elem=1',
  },
  {
    text: 'Stans beata Agnes',
    href: 'https://gregobase.selapa.net/download.php?id=2159&format=gabc&elem=1',
  },
  {
    text: 'Egregie Doctor Paule',
    href: 'https://gregobase.selapa.net/download.php?id=12417&format=gabc',
  },
  {
    text: 'Egregie Doctor',
    href: 'https://gregobase.selapa.net/download.php?id=2611&format=gabc&elem=1',
  },
  {
    text: 'Vade Anania et quaere',
    href: 'https://gregobase.selapa.net/download.php?id=12275&format=gabc',
  },
  {
    text: 'Vade Anania',
    href: 'https://gregobase.selapa.net/download.php?id=2598&format=gabc&elem=1',
  },
  {
    text: 'Gratia Dei in me',
    href: 'https://gregobase.selapa.net/download.php?id=11755&format=gabc&elem=1',
  },
  {
    text: 'Libenter gloriabor',
    href: 'https://gregobase.selapa.net/download.php?id=12051&format=gabc&elem=1',
  },
  {
    text: 'Ego plantavi',
    href: 'https://gregobase.selapa.net/download.php?id=12176&format=gabc&elem=1',
  },
  {
    text: 'Gratia Dei in me',
    href: 'https://gregobase.selapa.net/download.php?id=12979&format=gabc&elem=1',
  },
  {
    text: 'Ego plantavi',
    href: 'https://gregobase.selapa.net/download.php?id=13094&format=gabc&elem=1',
  },
  {
    text: 'Libenter gloriabor',
    href: 'https://gregobase.selapa.net/download.php?id=13148&format=gabc&elem=1',
  },
  {
    text: 'Ego plantavi',
    href: 'https://gregobase.selapa.net/download.php?id=2098&format=gabc&elem=1',
  },
  {
    text: 'Libenter gloriabor',
    href: 'https://gregobase.selapa.net/download.php?id=2725&format=gabc&elem=1',
  },
  {
    text: 'Gratia Dei in me',
    href: 'https://gregobase.selapa.net/download.php?id=2843&format=gabc&elem=1',
  },
  {
    text: 'Damasci praepositus gentis',
    href: 'https://gregobase.selapa.net/download.php?id=12908&format=gabc',
  },
  {
    text: 'Damasci praepositus gentis',
    href: 'https://gregobase.selapa.net/download.php?id=13052&format=gabc',
  },
  {
    text: 'Ter virgis caesus sum',
    href: 'https://gregobase.selapa.net/download.php?id=13229&format=gabc&elem=1',
  },
  {
    text: 'Ter virgis caesus sum',
    href: 'https://gregobase.selapa.net/download.php?id=13313&format=gabc&elem=1',
  },
  {
    text: 'Damasci praepositus',
    href: 'https://gregobase.selapa.net/download.php?id=1912&format=gabc&elem=1',
  },
  {
    text: 'Ter virgis caesus sum',
    href: 'https://gregobase.selapa.net/download.php?id=2262&format=gabc&elem=1',
  },
  {
    text: 'Vos qui secuti (S. Pauli)',
    href: 'https://gregobase.selapa.net/download.php?id=11736&format=gabc',
  },
  {
    text: 'Vos qui secuti (S. Pauli)',
    href: 'https://gregobase.selapa.net/download.php?id=12436&format=gabc',
  },
  {
    text: 'Sancte Paule Apostole',
    href: 'https://gregobase.selapa.net/download.php?id=2937&format=gabc&elem=1',
  },
  {
    text: 'Stans a dextris ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12004&format=gabc&elem=1',
  },
  {
    text: 'Stans a dextris ejus',
    href: 'https://gregobase.selapa.net/download.php?id=2656&format=gabc&elem=1',
  },
  {
    text: 'Martinae celebri plaudite',
    href: 'https://gregobase.selapa.net/download.php?id=13102&format=gabc',
  },
  {
    text: 'Tu natale solum protege',
    href: 'https://gregobase.selapa.net/download.php?id=12609&format=gabc',
  },
  {
    text: 'Non illam crucians',
    href: 'https://gregobase.selapa.net/download.php?id=13114&format=gabc',
  },
  {
    text: 'Senex puerum portabat',
    href: 'https://gregobase.selapa.net/download.php?id=12487&format=gabc&elem=1',
  },
  {
    text: 'Senex puerum portabat',
    href: 'https://gregobase.selapa.net/download.php?id=1979&format=gabc&elem=1',
  },
  {
    text: 'Accipiens Simeon puerum',
    href: 'https://gregobase.selapa.net/download.php?id=12217&format=gabc',
  },
  {
    text: 'Simeon justus et timoratus',
    href: 'https://gregobase.selapa.net/download.php?id=13251&format=gabc',
  },
  {
    text: 'Simeon justus',
    href: 'https://gregobase.selapa.net/download.php?id=2652&format=gabc&elem=1',
  },
  {
    text: 'Responsum accepit',
    href: 'https://gregobase.selapa.net/download.php?id=1853&format=gabc',
  },
  {
    text: 'Responsum accepit',
    href: 'https://gregobase.selapa.net/download.php?id=13302&format=gabc',
  },
  {
    text: 'Accipiens Simeon',
    href: 'https://gregobase.selapa.net/download.php?id=1944&format=gabc',
  },
  {
    text: 'Lumen ad revelationem (c4 clef)',
    href: 'https://gregobase.selapa.net/download.php?id=1846&format=gabc&elem=1',
  },
  {
    text: 'Lumen ad revelationem',
    href: 'https://gregobase.selapa.net/download.php?id=11742&format=gabc&elem=1',
  },
  {
    text: 'Cum inducerent puerum',
    href: 'https://gregobase.selapa.net/download.php?id=13145&format=gabc',
  },
  {
    text: 'Obtulerunt pro eo',
    href: 'https://gregobase.selapa.net/download.php?id=2505&format=gabc&elem=1',
  },
  {
    text: 'Obtulerunt pro eo',
    href: 'https://gregobase.selapa.net/download.php?id=11879&format=gabc&elem=1',
  },
  {
    text: 'Hodie beata V. M. puerum',
    href: 'https://gregobase.selapa.net/download.php?id=11921&format=gabc',
  },
  {
    text: 'Hodie beata Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=2750&format=gabc&elem=1',
  },
  {
    text: 'Quis es tu qui venisti',
    href: 'https://gregobase.selapa.net/download.php?id=12242&format=gabc',
  },
  {
    text: 'Stans beata Agatha',
    href: 'https://gregobase.selapa.net/download.php?id=2462&format=gabc&elem=1',
  },
  {
    text: 'Stans beata Agatha',
    href: 'https://gregobase.selapa.net/download.php?id=12468&format=gabc&elem=1',
  },
  {
    text: 'Medicinam carnalem',
    href: 'https://gregobase.selapa.net/download.php?id=12438&format=gabc&elem=1',
  },
  {
    text: 'Gratias tibi ago Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12694&format=gabc',
  },
  {
    text: 'Medicinam carnalem',
    href: 'https://gregobase.selapa.net/download.php?id=1955&format=gabc&elem=1',
  },
  {
    text: 'Gratias tibi ago',
    href: 'https://gregobase.selapa.net/download.php?id=2318&format=gabc&elem=1',
  },
  {
    text: 'Benedico... Apostolum',
    href: 'https://gregobase.selapa.net/download.php?id=13323&format=gabc&elem=1',
  },
  {
    text: 'Qui me dignatus est',
    href: 'https://gregobase.selapa.net/download.php?id=11859&format=gabc',
  },
  {
    text: 'Paganorum multitudo',
    href: 'https://gregobase.selapa.net/download.php?id=12170&format=gabc',
  },
  {
    text: 'Qui me dignatus est (Ant.)',
    href: 'https://gregobase.selapa.net/download.php?id=2530&format=gabc&elem=1',
  },
  {
    text: 'Ista est columba',
    href: 'https://gregobase.selapa.net/download.php?id=11728&format=gabc&elem=1',
  },
  {
    text: 'Candor est lucis',
    href: 'https://gregobase.selapa.net/download.php?id=12737&format=gabc',
  },
  {
    text: 'Mulier amicta sole',
    href: 'https://gregobase.selapa.net/download.php?id=12958&format=gabc&elem=1',
  },
  {
    text: 'Ista est columba',
    href: 'https://gregobase.selapa.net/download.php?id=2966&format=gabc&elem=1',
  },
  {
    text: 'Candor est lucis aeternae (Ant.)',
    href: 'https://gregobase.selapa.net/download.php?id=2041&format=gabc&elem=1',
  },
  {
    text: 'Mulier amicta sole',
    href: 'https://gregobase.selapa.net/download.php?id=2610&format=gabc&elem=1',
  },
  {
    text: 'Benedicta es tu Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=11760&format=gabc',
  },
  {
    text: 'Hodie nomen tuum',
    href: 'https://gregobase.selapa.net/download.php?id=12561&format=gabc&elem=1',
  },
  {
    text: 'Tu gloria Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=12655&format=gabc&elem=1',
  },
  {
    text: 'Tu gloria Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=12916&format=gabc&elem=1',
  },
  {
    text: 'Benedicta es tu Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=13010&format=gabc',
  },
  {
    text: 'Tu gloria Jerusalem',
    href: 'https://gregobase.selapa.net/download.php?id=2747&format=gabc&elem=1',
  },
  {
    text: 'Benedicta es tu',
    href: 'https://gregobase.selapa.net/download.php?id=2370&format=gabc&elem=1',
  },
  {
    text: 'Hodie nomen tuum',
    href: 'https://gregobase.selapa.net/download.php?id=2491&format=gabc&elem=1',
  },
  {
    text: 'Aurora soli praevia',
    href: 'https://gregobase.selapa.net/download.php?id=11951&format=gabc',
  },
  {
    text: 'Praeclara salutis aurora',
    href: 'https://gregobase.selapa.net/download.php?id=12748&format=gabc',
  },
  {
    text: 'Quae est ista quae ascendit',
    href: 'https://gregobase.selapa.net/download.php?id=11852&format=gabc&elem=1',
  },
  {
    text: 'Quae est ista',
    href: 'https://gregobase.selapa.net/download.php?id=3194&format=gabc&elem=1',
  },
  {
    text: 'Ego Mater',
    href: 'https://gregobase.selapa.net/download.php?id=3135&format=gabc&elem=1',
  },
  {
    text: 'Ego Mater Pulchrae',
    href: 'https://gregobase.selapa.net/download.php?id=12855&format=gabc',
  },
  {
    text: 'Qui me invenerit',
    href: 'https://gregobase.selapa.net/download.php?id=12481&format=gabc&elem=1',
  },
  {
    text: 'Omnis expertem maculae',
    href: 'https://gregobase.selapa.net/download.php?id=12930&format=gabc',
  },
  {
    text: 'Qui me invenerit',
    href: 'https://gregobase.selapa.net/download.php?id=3117&format=gabc&elem=1',
  },
  {
    text: 'Hodie gloriosa caeli',
    href: 'https://gregobase.selapa.net/download.php?id=12126&format=gabc',
  },
  {
    text: 'Hodie gloriosa',
    href: 'https://gregobase.selapa.net/download.php?id=2390&format=gabc&elem=1',
  },
  {
    text: 'Non recedet laus tua',
    href: 'https://gregobase.selapa.net/download.php?id=12122&format=gabc',
  },
  {
    text: 'Sic Patres vitam',
    href: 'https://gregobase.selapa.net/download.php?id=12784&format=gabc',
  },
  {
    text: 'Non recedet laus',
    href: 'https://gregobase.selapa.net/download.php?id=2866&format=gabc&elem=1',
  },
  {
    text: 'Matris sub almae numine',
    href: 'https://gregobase.selapa.net/download.php?id=12510&format=gabc',
  },
  {
    text: 'Ecce quam (Sept. Fundator.)',
    href: 'https://gregobase.selapa.net/download.php?id=12679&format=gabc',
  },
  {
    text: 'Matris sub almae',
    href: 'https://gregobase.selapa.net/download.php?id=2532&format=gabc&elem=1',
  },
  {
    text: 'Nomen eorum permanet',
    href: 'https://gregobase.selapa.net/download.php?id=13164&format=gabc',
  },
  {
    text: 'Nomen eorum',
    href: 'https://gregobase.selapa.net/download.php?id=2447&format=gabc&elem=1',
  },
  {
    text: 'Istarum est enim regnum',
    href: 'https://gregobase.selapa.net/download.php?id=11799&format=gabc',
  },
  {
    text: 'Istarum est enim',
    href: 'https://gregobase.selapa.net/download.php?id=8165&format=gabc&elem=1',
  },
  {
    text: 'Missus est Angelus ... ad virginem',
    href: 'https://gregobase.selapa.net/download.php?id=12453&format=gabc',
  },
  {
    text: 'Jacob autem genuit',
    href: 'https://gregobase.selapa.net/download.php?id=12216&format=gabc&elem=1',
  },
  {
    text: 'Cum esset desponsata',
    href: 'https://gregobase.selapa.net/download.php?id=12332&format=gabc',
  },
  {
    text: 'Jacob autem genuit',
    href: 'https://gregobase.selapa.net/download.php?id=12803&format=gabc&elem=1',
  },
  {
    text: 'Joseph vir ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12859&format=gabc&elem=1',
  },
  {
    text: 'Cum esset desponsata (19 Martii)',
    href: 'https://gregobase.selapa.net/download.php?id=2778&format=gabc&elem=1',
  },
  {
    text: 'Joseph vir ejus',
    href: 'https://gregobase.selapa.net/download.php?id=1865&format=gabc&elem=1',
  },
  {
    text: 'Angelus Domini apparuit Joseph (S. Jos)',
    href: 'https://gregobase.selapa.net/download.php?id=2673&format=gabc&elem=1',
  },
  {
    text: 'Angelus Domini apparuit (S. Jos.)',
    href: 'https://gregobase.selapa.net/download.php?id=12959&format=gabc',
  },
  {
    text: 'Te Joseph celebrent',
    href: 'https://gregobase.selapa.net/download.php?id=2235&format=gabc&elem=1',
  },
  {
    text: 'Te Joseph celebrent',
    href: 'https://gregobase.selapa.net/download.php?id=12399&format=gabc&elem=1',
  },
  {
    text: 'Ibant parentes Jesu',
    href: 'https://gregobase.selapa.net/download.php?id=12370&format=gabc',
  },
  {
    text: 'Exsurgens Joseph',
    href: 'https://gregobase.selapa.net/download.php?id=12956&format=gabc&elem=1',
  },
  {
    text: 'Cum redirent remansit',
    href: 'https://gregobase.selapa.net/download.php?id=13246&format=gabc',
  },
  {
    text: 'Exsurgens Joseph',
    href: 'https://gregobase.selapa.net/download.php?id=2664&format=gabc&elem=1',
  },
  {
    text: 'Cum redirent',
    href: 'https://gregobase.selapa.net/download.php?id=2607&format=gabc&elem=1',
  },
  {
    text: 'Non invenientes Jesum',
    href: 'https://gregobase.selapa.net/download.php?id=12172&format=gabc&elem=1',
  },
  {
    text: 'Dixit Mater ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12199&format=gabc',
  },
  {
    text: 'Non invenientes Jesum',
    href: 'https://gregobase.selapa.net/download.php?id=2796&format=gabc&elem=1',
  },
  {
    text: 'Iste quem laeti colimus',
    href: 'https://gregobase.selapa.net/download.php?id=12237&format=gabc',
  },
  {
    text: 'Descendit Jesus cum eis',
    href: 'https://gregobase.selapa.net/download.php?id=12929&format=gabc',
  },
  {
    text: 'Descendit Jesus cum eis',
    href: 'https://gregobase.selapa.net/download.php?id=13023&format=gabc',
  },
  {
    text: 'Ipse Jesus erat incipiens',
    href: 'https://gregobase.selapa.net/download.php?id=12158&format=gabc',
  },
  {
    text: 'Constituit eum dominum',
    href: 'https://gregobase.selapa.net/download.php?id=12645&format=gabc',
  },
  {
    text: 'Constituit eum',
    href: 'https://gregobase.selapa.net/download.php?id=3114&format=gabc&elem=1',
  },
  {
    text: 'Constituit eum dominum (T. Pasch.)',
    href: 'https://gregobase.selapa.net/download.php?id=12850&format=gabc&elem=1',
  },
  {
    text: 'Constituit eum dominum (T. Pasch.)',
    href: 'https://gregobase.selapa.net/download.php?id=13066&format=gabc&elem=1',
  },
  {
    text: 'Justus germinabit',
    href: 'https://gregobase.selapa.net/download.php?id=12027&format=gabc&elem=1',
  },
  {
    text: 'Magna est gloria ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=12257&format=gabc',
  },
  {
    text: 'Magna est gloria ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12441&format=gabc',
  },
  {
    text: 'Magna est gloria ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=12821&format=gabc',
  },
  {
    text: 'Magna est gloria ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12994&format=gabc',
  },
  {
    text: 'Magna est (Pascal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3067&format=gabc&elem=1',
  },
  {
    text: 'Justus germinabit',
    href: 'https://gregobase.selapa.net/download.php?id=3073&format=gabc&elem=1',
  },
  {
    text: 'Justus germinabit (T. Pasch.)',
    href: 'https://gregobase.selapa.net/download.php?id=12410&format=gabc',
  },
  {
    text: 'Justus germinabit (T. Pasch.)',
    href: 'https://gregobase.selapa.net/download.php?id=12626&format=gabc',
  },
  {
    text: 'Ecce fidelis servus',
    href: 'https://gregobase.selapa.net/download.php?id=13138&format=gabc&elem=1',
  },
  {
    text: 'Ecce fidelis servus',
    href: 'https://gregobase.selapa.net/download.php?id=2431&format=gabc&elem=1',
  },
  {
    text: 'Christe Sanctorum (S. Gabr.)',
    href: 'https://gregobase.selapa.net/download.php?id=12362&format=gabc',
  },
  {
    text: 'Angelus Gabriel apparuit',
    href: 'https://gregobase.selapa.net/download.php?id=12677&format=gabc&elem=1',
  },
  {
    text: 'Angelus Gabriel apparuit',
    href: 'https://gregobase.selapa.net/download.php?id=1983&format=gabc&elem=1',
  },
  {
    text: 'Ait autem Angelus',
    href: 'https://gregobase.selapa.net/download.php?id=12617&format=gabc&elem=1',
  },
  {
    text: 'Ingresso Zacharia templum',
    href: 'https://gregobase.selapa.net/download.php?id=12749&format=gabc',
  },
  {
    text: 'Ingresso Zacharia',
    href: 'https://gregobase.selapa.net/download.php?id=2911&format=gabc&elem=1',
  },
  {
    text: 'Ait autem Angelus',
    href: 'https://gregobase.selapa.net/download.php?id=2180&format=gabc&elem=1',
  },
  {
    text: 'Dixit autem Maria',
    href: 'https://gregobase.selapa.net/download.php?id=11843&format=gabc&elem=1',
  },
  {
    text: 'Gabriel Angelus ... Ecce',
    href: 'https://gregobase.selapa.net/download.php?id=12315&format=gabc',
  },
  {
    text: 'Ego sum Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=12560&format=gabc&elem=1',
  },
  {
    text: 'Ego sum Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=2579&format=gabc&elem=1',
  },
  {
    text: 'Gabriel Angelus... Ecce',
    href: 'https://gregobase.selapa.net/download.php?id=2307&format=gabc&elem=1',
  },
  {
    text: 'Dixit autem Maria',
    href: 'https://gregobase.selapa.net/download.php?id=2100&format=gabc&elem=1',
  },
  {
    text: 'Placare Christe (S. Gabr.)',
    href: 'https://gregobase.selapa.net/download.php?id=12318&format=gabc',
  },
  {
    text: 'Gabriel Angelus descendit',
    href: 'https://gregobase.selapa.net/download.php?id=12330&format=gabc',
  },
  {
    text: 'Archangelus Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=12957&format=gabc&elem=1',
  },
  {
    text: 'Archangelus Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=2971&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Sanctus',
    href: 'https://gregobase.selapa.net/download.php?id=1859&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Sanctus ... et virtus',
    href: 'https://gregobase.selapa.net/download.php?id=12017&format=gabc&elem=1',
  },
  {
    text: 'Missus est Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=11827&format=gabc&elem=1',
  },
  {
    text: 'Missus est Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=11848&format=gabc&elem=1',
  },
  {
    text: 'Ave Maria',
    href: 'https://gregobase.selapa.net/download.php?id=12056&format=gabc&elem=1',
  },
  {
    text: 'Ave Maria',
    href: 'https://gregobase.selapa.net/download.php?id=12596&format=gabc&elem=1',
  },
  {
    text: 'Ne timeas Maria',
    href: 'https://gregobase.selapa.net/download.php?id=13351&format=gabc',
  },
  {
    text: 'Missus est Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=2503&format=gabc&elem=1',
  },
  {
    text: 'Ave Maria... alleluia',
    href: 'https://gregobase.selapa.net/download.php?id=1953&format=gabc&elem=1',
  },
  {
    text: 'Ne timeas... alleluia',
    href: 'https://gregobase.selapa.net/download.php?id=2627&format=gabc&elem=1',
  },
  {
    text: 'Quomodo fiet istud',
    href: 'https://gregobase.selapa.net/download.php?id=12243&format=gabc',
  },
  {
    text: 'Dabit ei Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12501&format=gabc&elem=1',
  },
  {
    text: 'Dabit ei Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2088&format=gabc&elem=1',
  },
  {
    text: 'Ecce ancilla Domini',
    href: 'https://gregobase.selapa.net/download.php?id=1948&format=gabc&elem=1',
  },
  {
    text: 'Ecce ancilla Domini',
    href: 'https://gregobase.selapa.net/download.php?id=12613&format=gabc&elem=1',
  },
  {
    text: 'Ecce ancilla Domini',
    href: 'https://gregobase.selapa.net/download.php?id=13295&format=gabc&elem=1',
  },
  {
    text: 'Quomodo fiet',
    href: 'https://gregobase.selapa.net/download.php?id=2387&format=gabc&elem=1',
  },
  {
    text: 'Quomodo fiet istud',
    href: 'https://gregobase.selapa.net/download.php?id=12103&format=gabc',
  },
  {
    text: 'Gabriel Angelus... Ave.',
    href: 'https://gregobase.selapa.net/download.php?id=1839&format=gabc&elem=1',
  },
  {
    text: 'Gabriel Angelus... Ave',
    href: 'https://gregobase.selapa.net/download.php?id=12952&format=gabc&elem=1',
  },
  {
    text: 'Stabat Mater dolorosa',
    href: 'https://gregobase.selapa.net/download.php?id=13198&format=gabc',
  },
  {
    text: 'Tuam ipsius animam',
    href: 'https://gregobase.selapa.net/download.php?id=12511&format=gabc&elem=1',
  },
  {
    text: 'Tuam ipsius animam',
    href: 'https://gregobase.selapa.net/download.php?id=2559&format=gabc&elem=1',
  },
  {
    text: 'Dilectus meus candidus',
    href: 'https://gregobase.selapa.net/download.php?id=12002&format=gabc',
  },
  {
    text: 'Vadam ad montem',
    href: 'https://gregobase.selapa.net/download.php?id=12036&format=gabc&elem=1',
  },
  {
    text: 'Vadam ad montem',
    href: 'https://gregobase.selapa.net/download.php?id=2961&format=gabc&elem=1',
  },
  {
    text: 'Virgo Virginum praeclara',
    href: 'https://gregobase.selapa.net/download.php?id=12383&format=gabc',
  },
  {
    text: 'Fasciculus myrrhae',
    href: 'https://gregobase.selapa.net/download.php?id=12526&format=gabc&elem=1',
  },
  {
    text: 'Fulcite me floribus',
    href: 'https://gregobase.selapa.net/download.php?id=12925&format=gabc&elem=1',
  },
  {
    text: 'Fulcite me floribus',
    href: 'https://gregobase.selapa.net/download.php?id=13050&format=gabc&elem=1',
  },
  {
    text: 'Quo abiit dilectus',
    href: 'https://gregobase.selapa.net/download.php?id=13243&format=gabc',
  },
  {
    text: 'Quo abiit',
    href: 'https://gregobase.selapa.net/download.php?id=2852&format=gabc&elem=1',
  },
  {
    text: 'Fasciculus myrrhae',
    href: 'https://gregobase.selapa.net/download.php?id=2774&format=gabc&elem=1',
  },
  {
    text: 'Fulcite me floribus',
    href: 'https://gregobase.selapa.net/download.php?id=2900&format=gabc&elem=1',
  },
  {
    text: 'Sancta Mater istud agas',
    href: 'https://gregobase.selapa.net/download.php?id=12718&format=gabc',
  },
  {
    text: 'Cum vidisset Jesus Matrem',
    href: 'https://gregobase.selapa.net/download.php?id=11860&format=gabc&elem=1',
  },
  {
    text: 'Cum vidisset Jesus Matrem',
    href: 'https://gregobase.selapa.net/download.php?id=2927&format=gabc&elem=1',
  },
  {
    text: 'Posuit me desolatam',
    href: 'https://gregobase.selapa.net/download.php?id=13188&format=gabc',
  },
  {
    text: 'Facies mea intumuit',
    href: 'https://gregobase.selapa.net/download.php?id=13292&format=gabc',
  },
  {
    text: 'Deus vitam meam',
    href: 'https://gregobase.selapa.net/download.php?id=12892&format=gabc',
  },
  {
    text: 'Regali solio fortis',
    href: 'https://gregobase.selapa.net/download.php?id=11872&format=gabc',
  },
  {
    text: 'Nullis te genitor',
    href: 'https://gregobase.selapa.net/download.php?id=12866&format=gabc',
  },
  {
    text: 'Cum esset desponsata ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=12798&format=gabc',
  },
  {
    text: 'Jacob autem genuit ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=11800&format=gabc',
  },
  {
    text: 'Missus est Angelus ... in civitatem',
    href: 'https://gregobase.selapa.net/download.php?id=12043&format=gabc',
  },
  {
    text: 'Ascendit autem Joseph',
    href: 'https://gregobase.selapa.net/download.php?id=12446&format=gabc',
  },
  {
    text: 'Et venerunt festinantes',
    href: 'https://gregobase.selapa.net/download.php?id=12205&format=gabc',
  },
  {
    text: 'Et ipse Jesus erat',
    href: 'https://gregobase.selapa.net/download.php?id=12278&format=gabc',
  },
  {
    text: 'Et ipse Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=2005&format=gabc&elem=1',
  },
  {
    text: 'Caelitum Joseph decus',
    href: 'https://gregobase.selapa.net/download.php?id=11972&format=gabc',
  },
  {
    text: 'Joseph fili David',
    href: 'https://gregobase.selapa.net/download.php?id=12819&format=gabc',
  },
  {
    text: 'Constituit eum dominum (T. Pasch.)',
    href: 'https://gregobase.selapa.net/download.php?id=12850&format=gabc&elem=1',
  },
  {
    text: 'Constituit eum dominum (T. Pasch.)',
    href: 'https://gregobase.selapa.net/download.php?id=13066&format=gabc&elem=1',
  },
  {
    text: 'Confitebor nomini tuo',
    href: 'https://gregobase.selapa.net/download.php?id=11730&format=gabc',
  },
  {
    text: 'Justus germinabit (T. Pasch.)',
    href: 'https://gregobase.selapa.net/download.php?id=12410&format=gabc',
  },
  {
    text: 'Justus germinabit (T. Pasch.)',
    href: 'https://gregobase.selapa.net/download.php?id=12626&format=gabc',
  },
  {
    text: 'Fili quid fecisti (S. Joseph)',
    href: 'https://gregobase.selapa.net/download.php?id=12371&format=gabc',
  },
  {
    text: 'Domine ostende nobis',
    href: 'https://gregobase.selapa.net/download.php?id=11855&format=gabc',
  },
  {
    text: 'Non turbetur cor',
    href: 'https://gregobase.selapa.net/download.php?id=11949&format=gabc&elem=1',
  },
  {
    text: 'Philippe qui videt me',
    href: 'https://gregobase.selapa.net/download.php?id=12124&format=gabc&elem=1',
  },
  {
    text: 'Non turbetur cor',
    href: 'https://gregobase.selapa.net/download.php?id=1931&format=gabc&elem=1',
  },
  {
    text: 'Domine ostende',
    href: 'https://gregobase.selapa.net/download.php?id=2396&format=gabc&elem=1',
  },
  {
    text: 'Philippe qui videt me',
    href: 'https://gregobase.selapa.net/download.php?id=2696&format=gabc&elem=1',
  },
  {
    text: 'Si cognovissetis me',
    href: 'https://gregobase.selapa.net/download.php?id=11931&format=gabc&elem=1',
  },
  {
    text: 'Ego sum via veritas',
    href: 'https://gregobase.selapa.net/download.php?id=12015&format=gabc',
  },
  {
    text: 'Tanto tempore vobiscum',
    href: 'https://gregobase.selapa.net/download.php?id=12577&format=gabc',
  },
  {
    text: 'Si cognovissetis me',
    href: 'https://gregobase.selapa.net/download.php?id=2637&format=gabc&elem=1',
  },
  {
    text: 'Si diligitis me',
    href: 'https://gregobase.selapa.net/download.php?id=2137&format=gabc&elem=1',
  },
  {
    text: 'Si manseritis in me',
    href: 'https://gregobase.selapa.net/download.php?id=12372&format=gabc',
  },
  {
    text: 'Vexilla Regis (extra Tempus Passionis)',
    href: 'https://gregobase.selapa.net/download.php?id=12999&format=gabc&elem=1',
  },
  {
    text: 'O Crux splendidior',
    href: 'https://gregobase.selapa.net/download.php?id=12899&format=gabc',
  },
  {
    text: 'O crux splendidior',
    href: 'https://gregobase.selapa.net/download.php?id=1907&format=gabc&elem=1',
  },
  {
    text: 'O magnum pietatis',
    href: 'https://gregobase.selapa.net/download.php?id=12089&format=gabc&elem=1',
  },
  {
    text: 'Salva nos Christe',
    href: 'https://gregobase.selapa.net/download.php?id=12131&format=gabc&elem=1',
  },
  {
    text: 'Ecce Crucem Domini',
    href: 'https://gregobase.selapa.net/download.php?id=12682&format=gabc&elem=1',
  },
  {
    text: 'O magnum pietatis',
    href: 'https://gregobase.selapa.net/download.php?id=2164&format=gabc&elem=1',
  },
  {
    text: 'Salva nos Christe',
    href: 'https://gregobase.selapa.net/download.php?id=2529&format=gabc&elem=1',
  },
  {
    text: 'Ecce Crucem Domini',
    href: 'https://gregobase.selapa.net/download.php?id=2623&format=gabc&elem=1',
  },
  {
    text: 'Nos autem gloriari',
    href: 'https://gregobase.selapa.net/download.php?id=11816&format=gabc',
  },
  {
    text: 'Per signum Crucis',
    href: 'https://gregobase.selapa.net/download.php?id=12076&format=gabc',
  },
  {
    text: 'Super omnia ligna',
    href: 'https://gregobase.selapa.net/download.php?id=13034&format=gabc',
  },
  {
    text: 'Nos autem gloriari (Ant)',
    href: 'https://gregobase.selapa.net/download.php?id=2945&format=gabc&elem=1',
  },
  {
    text: 'Per signum crucis',
    href: 'https://gregobase.selapa.net/download.php?id=2868&format=gabc&elem=1',
  },
  {
    text: 'Hoc signum Crucis (T. Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=12123&format=gabc',
  },
  {
    text: 'Hoc signum Crucis (In Tempore Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=3174&format=gabc&elem=1',
  },
  {
    text: 'Hoc signum Crucis',
    href: 'https://gregobase.selapa.net/download.php?id=12102&format=gabc',
  },
  {
    text: 'Adoramus te Christe (T. Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=12834&format=gabc',
  },
  {
    text: 'Hoc signum',
    href: 'https://gregobase.selapa.net/download.php?id=3111&format=gabc&elem=1',
  },
  {
    text: 'Adoramus te Christe (TP)',
    href: 'https://gregobase.selapa.net/download.php?id=3217&format=gabc&elem=1',
  },
  {
    text: 'Adoramus te Christe',
    href: 'https://gregobase.selapa.net/download.php?id=12664&format=gabc&elem=1',
  },
  {
    text: 'Crucem sanctam subiit',
    href: 'https://gregobase.selapa.net/download.php?id=12292&format=gabc',
  },
  {
    text: 'Omnis terra adoret (T. Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=12448&format=gabc',
  },
  {
    text: 'Omnis terra adoret',
    href: 'https://gregobase.selapa.net/download.php?id=13154&format=gabc',
  },
  {
    text: 'Omnis terra (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3099&format=gabc&elem=1',
  },
  {
    text: 'Omnis terra',
    href: 'https://gregobase.selapa.net/download.php?id=694&format=gabc&elem=1',
  },
  {
    text: 'Crucem sanctam',
    href: 'https://gregobase.selapa.net/download.php?id=2884&format=gabc&elem=1',
  },
  {
    text: 'In ferventis olei',
    href: 'https://gregobase.selapa.net/download.php?id=12139&format=gabc&elem=1',
  },
  {
    text: 'In ferventis olei',
    href: 'https://gregobase.selapa.net/download.php?id=2211&format=gabc&elem=1',
  },
  {
    text: 'Te splendor et virtus (T. Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=12160&format=gabc',
  },
  {
    text: 'Te splendor et virtus',
    href: 'https://gregobase.selapa.net/download.php?id=2936&format=gabc&elem=1',
  },
  {
    text: 'Martyr Dei Venantius',
    href: 'https://gregobase.selapa.net/download.php?id=12663&format=gabc',
  },
  {
    text: 'Dum nocte pulsa Lucifer',
    href: 'https://gregobase.selapa.net/download.php?id=12065&format=gabc',
  },
  {
    text: 'Caelestis Agni nuptias',
    href: 'https://gregobase.selapa.net/download.php?id=12010&format=gabc',
  },
  {
    text: 'Caelestis Agni',
    href: 'https://gregobase.selapa.net/download.php?id=2832&format=gabc&elem=1',
  },
  {
    text: 'Joannes est nomen',
    href: 'https://gregobase.selapa.net/download.php?id=12911&format=gabc',
  },
  {
    text: 'Ipse praeibit ante illum',
    href: 'https://gregobase.selapa.net/download.php?id=12348&format=gabc',
  },
  {
    text: 'Joannes est nomen ejus',
    href: 'https://gregobase.selapa.net/download.php?id=2457&format=gabc&elem=1',
  },
  {
    text: 'Nazaraeus vocabitur',
    href: 'https://gregobase.selapa.net/download.php?id=12183&format=gabc&elem=1',
  },
  {
    text: 'Iste puer magnus',
    href: 'https://gregobase.selapa.net/download.php?id=12837&format=gabc&elem=1',
  },
  {
    text: 'Ut queant laxis resonare',
    href: 'https://gregobase.selapa.net/download.php?id=13042&format=gabc',
  },
  {
    text: 'Ex utero senectutis',
    href: 'https://gregobase.selapa.net/download.php?id=13178&format=gabc&elem=1',
  },
  {
    text: 'Ex utero senectutis',
    href: 'https://gregobase.selapa.net/download.php?id=2490&format=gabc&elem=1',
  },
  {
    text: 'Iste puer magnus',
    href: 'https://gregobase.selapa.net/download.php?id=2130&format=gabc&elem=1',
  },
  {
    text: 'Nazaraeus vocabitur',
    href: 'https://gregobase.selapa.net/download.php?id=2480&format=gabc&elem=1',
  },
  {
    text: 'Ut queant laxis',
    href: 'https://gregobase.selapa.net/download.php?id=2539&format=gabc&elem=1',
  },
  {
    text: 'Elisabeth Zachariae magnum',
    href: 'https://gregobase.selapa.net/download.php?id=12390&format=gabc',
  },
  {
    text: 'Ingresso Zacharia templum',
    href: 'https://gregobase.selapa.net/download.php?id=12497&format=gabc',
  },
  {
    text: 'Elisabeth Zachariae',
    href: 'https://gregobase.selapa.net/download.php?id=1990&format=gabc&elem=1',
  },
  {
    text: 'Tu puer propheta',
    href: 'https://gregobase.selapa.net/download.php?id=12285&format=gabc',
  },
  {
    text: 'Innuebant patri ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12374&format=gabc',
  },
  {
    text: 'Inter natos mulierum',
    href: 'https://gregobase.selapa.net/download.php?id=12967&format=gabc&elem=1',
  },
  {
    text: 'Innuebant patri',
    href: 'https://gregobase.selapa.net/download.php?id=2867&format=gabc&elem=1',
  },
  {
    text: 'Joannes vocabitur',
    href: 'https://gregobase.selapa.net/download.php?id=1829&format=gabc&elem=1',
  },
  {
    text: 'Joannes vocabitur nomen',
    href: 'https://gregobase.selapa.net/download.php?id=12338&format=gabc&elem=1',
  },
  {
    text: 'Inter natos mulierum',
    href: 'https://gregobase.selapa.net/download.php?id=2031&format=gabc&elem=1',
  },
  {
    text: 'Tu puer Propheta',
    href: 'https://gregobase.selapa.net/download.php?id=2352&format=gabc&elem=1',
  },
  {
    text: 'O nimis felix meritique',
    href: 'https://gregobase.selapa.net/download.php?id=12502&format=gabc',
  },
  {
    text: 'O nimis felix',
    href: 'https://gregobase.selapa.net/download.php?id=1978&format=gabc&elem=1',
  },
  {
    text: 'O nimis felix meritique (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=12081&format=gabc',
  },
  {
    text: 'Apertum est os Zachariae',
    href: 'https://gregobase.selapa.net/download.php?id=12991&format=gabc&elem=1',
  },
  {
    text: 'Apertum est os Zachariae',
    href: 'https://gregobase.selapa.net/download.php?id=2575&format=gabc&elem=1',
  },
  {
    text: 'Inter natos mulierum',
    href: 'https://gregobase.selapa.net/download.php?id=13217&format=gabc&elem=1',
  },
  {
    text: 'Fuit homo missus',
    href: 'https://gregobase.selapa.net/download.php?id=12772&format=gabc&elem=1',
  },
  {
    text: 'Inter natos mulierum',
    href: 'https://gregobase.selapa.net/download.php?id=3132&format=gabc&elem=1',
  },
  {
    text: 'Elisabeth Zachariae',
    href: 'https://gregobase.selapa.net/download.php?id=12745&format=gabc&elem=1',
  },
  {
    text: 'Puer qui natus est',
    href: 'https://gregobase.selapa.net/download.php?id=12788&format=gabc',
  },
  {
    text: 'Elisabeth Zachariae',
    href: 'https://gregobase.selapa.net/download.php?id=3065&format=gabc&elem=1',
  },
  {
    text: 'Puer qui natus est',
    href: 'https://gregobase.selapa.net/download.php?id=2106&format=gabc',
  },
  {
    text: 'Paulus et Joannes dixerunt Juliano',
    href: 'https://gregobase.selapa.net/download.php?id=11962&format=gabc',
  },
  {
    text: 'Astiterunt justi ante',
    href: 'https://gregobase.selapa.net/download.php?id=12268&format=gabc',
  },
  {
    text: 'Astiterunt justi',
    href: 'https://gregobase.selapa.net/download.php?id=2220&format=gabc&elem=1',
  },
  {
    text: 'Paulus et Joannes... Juliano',
    href: 'https://gregobase.selapa.net/download.php?id=2472&format=gabc&elem=1',
  },
  {
    text: 'Sancti spiritus et animae',
    href: 'https://gregobase.selapa.net/download.php?id=11727&format=gabc',
  },
  {
    text: 'Paulus et Joannes dixerunt ad Terent',
    href: 'https://gregobase.selapa.net/download.php?id=12922&format=gabc',
  },
  {
    text: 'Joannes et Paulus agnoscentes',
    href: 'https://gregobase.selapa.net/download.php?id=13003&format=gabc&elem=1',
  },
  {
    text: 'Paulus et Joannes... ad Terentianum',
    href: 'https://gregobase.selapa.net/download.php?id=2523&format=gabc&elem=1',
  },
  {
    text: 'Joannes et Paulus agnoscentes',
    href: 'https://gregobase.selapa.net/download.php?id=2280&format=gabc&elem=1',
  },
  {
    text: 'Sancti spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=2649&format=gabc&elem=1',
  },
  {
    text: 'Isti sunt Sancti qui pro Dei',
    href: 'https://gregobase.selapa.net/download.php?id=11938&format=gabc',
  },
  {
    text: 'Joannes et Paulus dixerunt',
    href: 'https://gregobase.selapa.net/download.php?id=12224&format=gabc&elem=1',
  },
  {
    text: 'Joannes et Paulus dixerunt',
    href: 'https://gregobase.selapa.net/download.php?id=2364&format=gabc&elem=1',
  },
  {
    text: 'Isti sunt duae olivae',
    href: 'https://gregobase.selapa.net/download.php?id=12759&format=gabc&elem=1',
  },
  {
    text: 'Isti sunt duae olivae',
    href: 'https://gregobase.selapa.net/download.php?id=2890&format=gabc&elem=1',
  },
  {
    text: 'Decora lux aeternitatis',
    href: 'https://gregobase.selapa.net/download.php?id=11881&format=gabc',
  },
  {
    text: 'Decora lux aeternitatis (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=13012&format=gabc',
  },
  {
    text: 'Tu es pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=12681&format=gabc',
  },
  {
    text: 'Tu es pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=12920&format=gabc',
  },
  {
    text: 'Tu es pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=13030&format=gabc',
  },
  {
    text: 'Tu es Pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=2717&format=gabc&elem=1',
  },
  {
    text: 'Misit Dominus ... de manu',
    href: 'https://gregobase.selapa.net/download.php?id=11974&format=gabc',
  },
  {
    text: 'Dixit Angelus ad Petrum',
    href: 'https://gregobase.selapa.net/download.php?id=12062&format=gabc&elem=1',
  },
  {
    text: 'Misit Dominus ... de manu',
    href: 'https://gregobase.selapa.net/download.php?id=12234&format=gabc',
  },
  {
    text: 'Dixit Angelus ad Petrum',
    href: 'https://gregobase.selapa.net/download.php?id=12458&format=gabc&elem=1',
  },
  {
    text: 'Petrus et Joannes',
    href: 'https://gregobase.selapa.net/download.php?id=13139&format=gabc&elem=1',
  },
  {
    text: 'Argentum et aurum',
    href: 'https://gregobase.selapa.net/download.php?id=13221&format=gabc&elem=1',
  },
  {
    text: 'Petrus et Joannes',
    href: 'https://gregobase.selapa.net/download.php?id=1866&format=gabc&elem=1',
  },
  {
    text: 'Argentum et aurum',
    href: 'https://gregobase.selapa.net/download.php?id=2580&format=gabc&elem=1',
  },
  {
    text: 'Dixit Angelus ad Petrum',
    href: 'https://gregobase.selapa.net/download.php?id=2589&format=gabc&elem=1',
  },
  {
    text: 'Misit Dominus…de manu',
    href: 'https://gregobase.selapa.net/download.php?id=2557&format=gabc&elem=1',
  },
  {
    text: 'Tu es Petrus',
    href: 'https://gregobase.selapa.net/download.php?id=12270&format=gabc',
  },
  {
    text: 'Tu es Petrus',
    href: 'https://gregobase.selapa.net/download.php?id=12432&format=gabc',
  },
  {
    text: 'Beate Pastor Petre',
    href: 'https://gregobase.selapa.net/download.php?id=13160&format=gabc&elem=1',
  },
  {
    text: 'Beate Pastor Petre',
    href: 'https://gregobase.selapa.net/download.php?id=13301&format=gabc&elem=1',
  },
  {
    text: 'Beate Pastor Petre',
    href: 'https://gregobase.selapa.net/download.php?id=1988&format=gabc&elem=1',
  },
  {
    text: 'Quodcumque ligaveris',
    href: 'https://gregobase.selapa.net/download.php?id=12558&format=gabc&elem=1',
  },
  {
    text: 'Quodcumque ligaveris',
    href: 'https://gregobase.selapa.net/download.php?id=12928&format=gabc&elem=1',
  },
  {
    text: 'Quodcumque ligaveris',
    href: 'https://gregobase.selapa.net/download.php?id=2689&format=gabc&elem=1',
  },
  {
    text: 'Hodie Simon Petrus',
    href: 'https://gregobase.selapa.net/download.php?id=1918&format=gabc&elem=1',
  },
  {
    text: 'Hodie Simon Petrus',
    href: 'https://gregobase.selapa.net/download.php?id=12313&format=gabc&elem=1',
  },
  {
    text: 'Sancte Paule Apostole',
    href: 'https://gregobase.selapa.net/download.php?id=2937&format=gabc&elem=1',
  },
  {
    text: 'Gratia Dei in me',
    href: 'https://gregobase.selapa.net/download.php?id=11755&format=gabc&elem=1',
  },
  {
    text: 'Libenter gloriabor',
    href: 'https://gregobase.selapa.net/download.php?id=12051&format=gabc&elem=1',
  },
  {
    text: 'Ego plantavi',
    href: 'https://gregobase.selapa.net/download.php?id=12176&format=gabc&elem=1',
  },
  {
    text: 'Gratia Dei in me',
    href: 'https://gregobase.selapa.net/download.php?id=12979&format=gabc&elem=1',
  },
  {
    text: 'Ego plantavi',
    href: 'https://gregobase.selapa.net/download.php?id=13094&format=gabc&elem=1',
  },
  {
    text: 'Libenter gloriabor',
    href: 'https://gregobase.selapa.net/download.php?id=13148&format=gabc&elem=1',
  },
  {
    text: 'Libenter gloriabor',
    href: 'https://gregobase.selapa.net/download.php?id=2725&format=gabc&elem=1',
  },
  {
    text: 'Gratia Dei in me',
    href: 'https://gregobase.selapa.net/download.php?id=2843&format=gabc&elem=1',
  },
  {
    text: 'Vos qui secuti (S. Pauli)',
    href: 'https://gregobase.selapa.net/download.php?id=11736&format=gabc',
  },
  {
    text: 'Vos qui secuti (S. Pauli)',
    href: 'https://gregobase.selapa.net/download.php?id=12436&format=gabc',
  },
  {
    text: 'Damasci praepositus gentis',
    href: 'https://gregobase.selapa.net/download.php?id=12908&format=gabc',
  },
  {
    text: 'Damasci praepositus gentis',
    href: 'https://gregobase.selapa.net/download.php?id=13052&format=gabc',
  },
  {
    text: 'Ter virgis caesus sum',
    href: 'https://gregobase.selapa.net/download.php?id=13229&format=gabc&elem=1',
  },
  {
    text: 'Ter virgis caesus sum',
    href: 'https://gregobase.selapa.net/download.php?id=13313&format=gabc&elem=1',
  },
  {
    text: 'Damasci praepositus',
    href: 'https://gregobase.selapa.net/download.php?id=1912&format=gabc&elem=1',
  },
  {
    text: 'Ter virgis caesus sum',
    href: 'https://gregobase.selapa.net/download.php?id=2262&format=gabc&elem=1',
  },
  {
    text: 'Ego qui loquor justitiam',
    href: 'https://gregobase.selapa.net/download.php?id=11749&format=gabc',
  },
  {
    text: 'Vestitus erat veste',
    href: 'https://gregobase.selapa.net/download.php?id=12295&format=gabc',
  },
  {
    text: 'Quis est iste qui venit',
    href: 'https://gregobase.selapa.net/download.php?id=12394&format=gabc',
  },
  {
    text: 'Ego qui loquor',
    href: 'https://gregobase.selapa.net/download.php?id=2069&format=gabc&elem=1',
  },
  {
    text: 'Vestitus erat',
    href: 'https://gregobase.selapa.net/download.php?id=2225&format=gabc&elem=1',
  },
  {
    text: 'Torcular calcavi',
    href: 'https://gregobase.selapa.net/download.php?id=12495&format=gabc&elem=1',
  },
  {
    text: 'Quare ergo rubrum',
    href: 'https://gregobase.selapa.net/download.php?id=12760&format=gabc',
  },
  {
    text: 'Festivis resonent compita',
    href: 'https://gregobase.selapa.net/download.php?id=13057&format=gabc',
  },
  {
    text: 'Quare ergo rubrum est',
    href: 'https://gregobase.selapa.net/download.php?id=2066&format=gabc&elem=1',
  },
  {
    text: 'Torcular calcavi',
    href: 'https://gregobase.selapa.net/download.php?id=2511&format=gabc&elem=1',
  },
  {
    text: 'Festivis resonent',
    href: 'https://gregobase.selapa.net/download.php?id=2839&format=gabc&elem=1',
  },
  {
    text: 'Hi qui amicti sunt',
    href: 'https://gregobase.selapa.net/download.php?id=12653&format=gabc&elem=1',
  },
  {
    text: 'Hi sunt qui venerunt',
    href: 'https://gregobase.selapa.net/download.php?id=13303&format=gabc&elem=1',
  },
  {
    text: 'Accessistis ad Sion',
    href: 'https://gregobase.selapa.net/download.php?id=2509&format=gabc&elem=1',
  },
  {
    text: 'Accessistis ad Sion',
    href: 'https://gregobase.selapa.net/download.php?id=11959&format=gabc&elem=1',
  },
  {
    text: 'Hi qui amicti sunt',
    href: 'https://gregobase.selapa.net/download.php?id=2015&format=gabc&elem=1',
  },
  {
    text: 'Hi sunt qui venerunt',
    href: 'https://gregobase.selapa.net/download.php?id=2397&format=gabc&elem=1',
  },
  {
    text: 'Et ipsi vicerunt',
    href: 'https://gregobase.selapa.net/download.php?id=11937&format=gabc',
  },
  {
    text: 'Ideo sunt ante thronum',
    href: 'https://gregobase.selapa.net/download.php?id=12277&format=gabc',
  },
  {
    text: 'Ideo sunt',
    href: 'https://gregobase.selapa.net/download.php?id=2379&format=gabc&elem=1',
  },
  {
    text: 'Et ipsi vicerunt',
    href: 'https://gregobase.selapa.net/download.php?id=1945&format=gabc',
  },
  {
    text: 'Beati qui lavant',
    href: 'https://gregobase.selapa.net/download.php?id=2414&format=gabc&elem=1',
  },
  {
    text: 'Salvete Christi vulnera',
    href: 'https://gregobase.selapa.net/download.php?id=13091&format=gabc&elem=1',
  },
  {
    text: 'Salvete Christi vulnera',
    href: 'https://gregobase.selapa.net/download.php?id=2294&format=gabc&elem=1',
  },
  {
    text: 'Erit sanguis Agni',
    href: 'https://gregobase.selapa.net/download.php?id=11731&format=gabc&elem=1',
  },
  {
    text: 'Redemisti nos Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12756&format=gabc&elem=1',
  },
  {
    text: 'Erit sanguis Agni',
    href: 'https://gregobase.selapa.net/download.php?id=2894&format=gabc&elem=1',
  },
  {
    text: 'Redemisti nos Domine',
    href: 'https://gregobase.selapa.net/download.php?id=3064&format=gabc&elem=1',
  },
  {
    text: 'Christus dilexit nos',
    href: 'https://gregobase.selapa.net/download.php?id=13143&format=gabc',
  },
  {
    text: 'Sanguis Jesu Christi',
    href: 'https://gregobase.selapa.net/download.php?id=13343&format=gabc&elem=1',
  },
  {
    text: 'Sanguis Jesu Christi',
    href: 'https://gregobase.selapa.net/download.php?id=3103&format=gabc&elem=1',
  },
  {
    text: 'Christus dilexit',
    href: 'https://gregobase.selapa.net/download.php?id=3140&format=gabc&elem=1',
  },
  {
    text: 'Habebitis autem hunc',
    href: 'https://gregobase.selapa.net/download.php?id=12612&format=gabc',
  },
  {
    text: 'Beata es Maria',
    href: 'https://gregobase.selapa.net/download.php?id=13018&format=gabc',
  },
  {
    text: 'Beata es Maria',
    href: 'https://gregobase.selapa.net/download.php?id=13037&format=gabc',
  },
  {
    text: 'Habebitis autem',
    href: 'https://gregobase.selapa.net/download.php?id=2444&format=gabc&elem=1',
  },
  {
    text: 'Beata es Maria (Visitation)',
    href: 'https://gregobase.selapa.net/download.php?id=2469&format=gabc&elem=1',
  },
  {
    text: 'Exsurgens Maria',
    href: 'https://gregobase.selapa.net/download.php?id=11768&format=gabc&elem=1',
  },
  {
    text: 'Intravit Maria',
    href: 'https://gregobase.selapa.net/download.php?id=11788&format=gabc&elem=1',
  },
  {
    text: 'Ut audivit salutationem',
    href: 'https://gregobase.selapa.net/download.php?id=12933&format=gabc',
  },
  {
    text: 'Exsurgens Maria',
    href: 'https://gregobase.selapa.net/download.php?id=2841&format=gabc&elem=1',
  },
  {
    text: 'Intravit Maria',
    href: 'https://gregobase.selapa.net/download.php?id=1994&format=gabc&elem=1',
  },
  {
    text: 'Ut audivit',
    href: 'https://gregobase.selapa.net/download.php?id=2845&format=gabc&elem=1',
  },
  {
    text: 'Cum audisset salutationem',
    href: 'https://gregobase.selapa.net/download.php?id=12507&format=gabc',
  },
  {
    text: 'Ex quo facta est vox (Visit.)',
    href: 'https://gregobase.selapa.net/download.php?id=12530&format=gabc',
  },
  {
    text: 'Benedicta tu inter mulieres',
    href: 'https://gregobase.selapa.net/download.php?id=1840&format=gabc&elem=1',
  },
  {
    text: 'Benedicta tu inter mulieres',
    href: 'https://gregobase.selapa.net/download.php?id=13115&format=gabc&elem=1',
  },
  {
    text: 'Ex quo facta est',
    href: 'https://gregobase.selapa.net/download.php?id=1975&format=gabc&elem=1',
  },
  {
    text: 'Beatam me dicent ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=13107&format=gabc',
  },
  {
    text: 'Gloriosi principes terrae',
    href: 'https://gregobase.selapa.net/download.php?id=12007&format=gabc',
  },
  {
    text: 'Petrus Apostolus et Paulus',
    href: 'https://gregobase.selapa.net/download.php?id=12354&format=gabc',
  },
  {
    text: 'Petrus Apostolus',
    href: 'https://gregobase.selapa.net/download.php?id=2974&format=gabc&elem=1',
  },
  {
    text: 'Sedibus caeli nitidis',
    href: 'https://gregobase.selapa.net/download.php?id=12050&format=gabc',
  },
  {
    text: 'Sedibus caeli',
    href: 'https://gregobase.selapa.net/download.php?id=2006&format=gabc&elem=1',
  },
  {
    text: 'O quam speciosi pedes',
    href: 'https://gregobase.selapa.net/download.php?id=12325&format=gabc',
  },
  {
    text: 'Lux o decora patriae',
    href: 'https://gregobase.selapa.net/download.php?id=12688&format=gabc',
  },
  {
    text: 'O quam speciosi',
    href: 'https://gregobase.selapa.net/download.php?id=2516&format=gabc&elem=1',
  },
  {
    text: 'In sanctitate et justitia',
    href: 'https://gregobase.selapa.net/download.php?id=11868&format=gabc',
  },
  {
    text: 'Isti sunt viri... facti',
    href: 'https://gregobase.selapa.net/download.php?id=11928&format=gabc&elem=1',
  },
  {
    text: 'Domare cordis impetus',
    href: 'https://gregobase.selapa.net/download.php?id=12024&format=gabc',
  },
  {
    text: 'Isti sunt viri... facti',
    href: 'https://gregobase.selapa.net/download.php?id=2341&format=gabc&elem=1',
  },
  {
    text: 'Et nunc reges intelligite',
    href: 'https://gregobase.selapa.net/download.php?id=11740&format=gabc',
  },
  {
    text: 'Opes decusque regium',
    href: 'https://gregobase.selapa.net/download.php?id=13218&format=gabc',
  },
  {
    text: 'Et nunc reges',
    href: 'https://gregobase.selapa.net/download.php?id=1874&format=gabc&elem=1',
  },
  {
    text: 'Elisabeth pacis et patriae',
    href: 'https://gregobase.selapa.net/download.php?id=12365&format=gabc',
  },
  {
    text: 'Tu gloria Jerusalem (S. Elisabeth)',
    href: 'https://gregobase.selapa.net/download.php?id=13105&format=gabc',
  },
  {
    text: 'Elisabeth pacis',
    href: 'https://gregobase.selapa.net/download.php?id=2001&format=gabc&elem=1',
  },
  {
    text: 'Gloria Libani data est',
    href: 'https://gregobase.selapa.net/download.php?id=12513&format=gabc',
  },
  {
    text: 'Caput tuum ut Carmelus',
    href: 'https://gregobase.selapa.net/download.php?id=12963&format=gabc',
  },
  {
    text: 'Gloria Libani',
    href: 'https://gregobase.selapa.net/download.php?id=2324&format=gabc&elem=1',
  },
  {
    text: 'Pater superni luminis',
    href: 'https://gregobase.selapa.net/download.php?id=1841&format=gabc&elem=1',
  },
  {
    text: 'Pater superni luminis',
    href: 'https://gregobase.selapa.net/download.php?id=13352&format=gabc&elem=1',
  },
  {
    text: 'In diebus illis mulier',
    href: 'https://gregobase.selapa.net/download.php?id=12201&format=gabc',
  },
  {
    text: 'Summi Parentis Unice',
    href: 'https://gregobase.selapa.net/download.php?id=13257&format=gabc',
  },
  {
    text: 'In diebus illis',
    href: 'https://gregobase.selapa.net/download.php?id=2101&format=gabc&elem=1',
  },
  {
    text: 'Maria ergo unxit',
    href: 'https://gregobase.selapa.net/download.php?id=11892&format=gabc',
  },
  {
    text: 'Mulier quae erat ... attulit',
    href: 'https://gregobase.selapa.net/download.php?id=12433&format=gabc',
  },
  {
    text: 'Mulier quae erat',
    href: 'https://gregobase.selapa.net/download.php?id=2711&format=gabc&elem=1',
  },
  {
    text: 'Miris modis repente',
    href: 'https://gregobase.selapa.net/download.php?id=13004&format=gabc',
  },
  {
    text: 'Miris modis repente liber',
    href: 'https://gregobase.selapa.net/download.php?id=2070&format=gabc&elem=1',
  },
  {
    text: 'Tu es pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=12681&format=gabc',
  },
  {
    text: 'Tu es pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=12920&format=gabc',
  },
  {
    text: 'Tu es pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=13030&format=gabc',
  },
  {
    text: 'Tu es Pastor ovium',
    href: 'https://gregobase.selapa.net/download.php?id=2717&format=gabc&elem=1',
  },
  {
    text: 'Dixit Angelus ad Petrum',
    href: 'https://gregobase.selapa.net/download.php?id=12062&format=gabc&elem=1',
  },
  {
    text: 'Herodes rex apposuit',
    href: 'https://gregobase.selapa.net/download.php?id=12395&format=gabc&elem=1',
  },
  {
    text: 'Dixit Angelus ad Petrum',
    href: 'https://gregobase.selapa.net/download.php?id=12458&format=gabc&elem=1',
  },
  {
    text: 'Petrus quidem servabatur',
    href: 'https://gregobase.selapa.net/download.php?id=12477&format=gabc',
  },
  {
    text: 'Herodes rex apposuit',
    href: 'https://gregobase.selapa.net/download.php?id=2593&format=gabc&elem=1',
  },
  {
    text: 'Petrus quidem',
    href: 'https://gregobase.selapa.net/download.php?id=2553&format=gabc&elem=1',
  },
  {
    text: 'Dixit Angelus ad Petrum',
    href: 'https://gregobase.selapa.net/download.php?id=2589&format=gabc&elem=1',
  },
  {
    text: 'Misit Dominus ... de manu',
    href: 'https://gregobase.selapa.net/download.php?id=11974&format=gabc',
  },
  {
    text: 'Misit Dominus ... de manu',
    href: 'https://gregobase.selapa.net/download.php?id=12234&format=gabc',
  },
  {
    text: 'Tu es Petrus',
    href: 'https://gregobase.selapa.net/download.php?id=12270&format=gabc',
  },
  {
    text: 'Tu es Petrus',
    href: 'https://gregobase.selapa.net/download.php?id=12432&format=gabc',
  },
  {
    text: 'Misit Dominus…de manu',
    href: 'https://gregobase.selapa.net/download.php?id=2557&format=gabc&elem=1',
  },
  {
    text: 'Solve jubente Deo',
    href: 'https://gregobase.selapa.net/download.php?id=13247&format=gabc&elem=1',
  },
  {
    text: 'Solve jubente Deo',
    href: 'https://gregobase.selapa.net/download.php?id=2012&format=gabc&elem=1',
  },
  {
    text: 'Quicumque Christum quaeritis',
    href: 'https://gregobase.selapa.net/download.php?id=11934&format=gabc',
  },
  {
    text: 'Quicumque Christum',
    href: 'https://gregobase.selapa.net/download.php?id=2309&format=gabc&elem=1',
  },
  {
    text: 'Christus Jesus splendor',
    href: 'https://gregobase.selapa.net/download.php?id=12381&format=gabc',
  },
  {
    text: 'Christus Jesus',
    href: 'https://gregobase.selapa.net/download.php?id=2357&format=gabc&elem=1',
  },
  {
    text: 'Resplenduit facies ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12098&format=gabc',
  },
  {
    text: 'Assumpsit Jesus Petrum',
    href: 'https://gregobase.selapa.net/download.php?id=12311&format=gabc&elem=1',
  },
  {
    text: 'Assumpsit Jesus Petrum',
    href: 'https://gregobase.selapa.net/download.php?id=2500&format=gabc&elem=1',
  },
  {
    text: 'Resplenduit facies',
    href: 'https://gregobase.selapa.net/download.php?id=2687&format=gabc&elem=1',
  },
  {
    text: 'Adhuc eo loquente',
    href: 'https://gregobase.selapa.net/download.php?id=11766&format=gabc&elem=1',
  },
  {
    text: 'Et ecce apparuerunt',
    href: 'https://gregobase.selapa.net/download.php?id=11824&format=gabc&elem=1',
  },
  {
    text: 'Respondens autem Petrus',
    href: 'https://gregobase.selapa.net/download.php?id=11956&format=gabc&elem=1',
  },
  {
    text: 'Lux alma Jesu mentium',
    href: 'https://gregobase.selapa.net/download.php?id=13070&format=gabc',
  },
  {
    text: 'Et ecce apparuerunt',
    href: 'https://gregobase.selapa.net/download.php?id=2347&format=gabc&elem=1',
  },
  {
    text: 'Respondens autem Petrus',
    href: 'https://gregobase.selapa.net/download.php?id=2455&format=gabc&elem=1',
  },
  {
    text: 'Adhuc eo loquente',
    href: 'https://gregobase.selapa.net/download.php?id=2487&format=gabc&elem=1',
  },
  {
    text: 'Et ecce vox de nube',
    href: 'https://gregobase.selapa.net/download.php?id=13061&format=gabc',
  },
  {
    text: 'Gloriosus apparuisti',
    href: 'https://gregobase.selapa.net/download.php?id=12042&format=gabc&elem=1',
  },
  {
    text: 'Gloriosus apparuisti',
    href: 'https://gregobase.selapa.net/download.php?id=3091&format=gabc&elem=1',
  },
  {
    text: 'Gloria et honore ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=11838&format=gabc',
  },
  {
    text: 'Magna est gloria ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=12257&format=gabc',
  },
  {
    text: 'Et audientes discipuli',
    href: 'https://gregobase.selapa.net/download.php?id=12305&format=gabc&elem=1',
  },
  {
    text: 'Magna est gloria ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=12821&format=gabc',
  },
  {
    text: 'Magna est (Pascal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3067&format=gabc&elem=1',
  },
  {
    text: 'Et audientes discipuli',
    href: 'https://gregobase.selapa.net/download.php?id=2577&format=gabc&elem=1',
  },
  {
    text: 'Quaerite primum (S. Caiet.)',
    href: 'https://gregobase.selapa.net/download.php?id=11791&format=gabc',
  },
  {
    text: 'Nolite solliciti esse (S. Caietani)',
    href: 'https://gregobase.selapa.net/download.php?id=13099&format=gabc',
  },
  {
    text: 'Quaerite primum (St. Cajetan)',
    href: 'https://gregobase.selapa.net/download.php?id=2970&format=gabc&elem=1',
  },
  {
    text: 'Laurentius ingressus est',
    href: 'https://gregobase.selapa.net/download.php?id=12210&format=gabc&elem=1',
  },
  {
    text: 'Levita Laurentius bonum opus',
    href: 'https://gregobase.selapa.net/download.php?id=12418&format=gabc',
  },
  {
    text: 'Laurentius ingressus est',
    href: 'https://gregobase.selapa.net/download.php?id=2872&format=gabc&elem=1',
  },
  {
    text: 'Laurentius bonum opus',
    href: 'https://gregobase.selapa.net/download.php?id=12706&format=gabc&elem=1',
  },
  {
    text: 'Beatus Laurentius orabat',
    href: 'https://gregobase.selapa.net/download.php?id=12942&format=gabc&elem=1',
  },
  {
    text: 'Adhaesit anima mea (S. Laurentii)',
    href: 'https://gregobase.selapa.net/download.php?id=13111&format=gabc',
  },
  {
    text: 'Laurentius bonum opus',
    href: 'https://gregobase.selapa.net/download.php?id=2893&format=gabc&elem=1',
  },
  {
    text: 'Adhaesit anima (St. Laurenti)',
    href: 'https://gregobase.selapa.net/download.php?id=2141&format=gabc&elem=1',
  },
  {
    text: 'Misit Dominus (S. Laurentii)',
    href: 'https://gregobase.selapa.net/download.php?id=2071&format=gabc&elem=1',
  },
  {
    text: 'Misit Dominus ... de medio',
    href: 'https://gregobase.selapa.net/download.php?id=12809&format=gabc&elem=1',
  },
  {
    text: 'Beatus Laurentius orabat',
    href: 'https://gregobase.selapa.net/download.php?id=2743&format=gabc&elem=1',
  },
  {
    text: 'In craticula te Deum',
    href: 'https://gregobase.selapa.net/download.php?id=12226&format=gabc',
  },
  {
    text: 'Beatus Laurentius dum in',
    href: 'https://gregobase.selapa.net/download.php?id=11840&format=gabc',
  },
  {
    text: 'Beatus Laurentius dum',
    href: 'https://gregobase.selapa.net/download.php?id=2955&format=gabc&elem=1',
  },
  {
    text: 'O Prima Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=11992&format=gabc',
  },
  {
    text: 'O prima Virgo prodita',
    href: 'https://gregobase.selapa.net/download.php?id=1905&format=gabc&elem=1',
  },
  {
    text: 'Virgo prudentissima',
    href: 'https://gregobase.selapa.net/download.php?id=12851&format=gabc&elem=1',
  },
  {
    text: 'Virgo prudentissima',
    href: 'https://gregobase.selapa.net/download.php?id=2183&format=gabc&elem=1',
  },
  {
    text: 'Assumpta est Maria',
    href: 'https://gregobase.selapa.net/download.php?id=11751&format=gabc&elem=1',
  },
  {
    text: 'Maria Virgo assumpta',
    href: 'https://gregobase.selapa.net/download.php?id=12535&format=gabc',
  },
  {
    text: 'Maria Virgo assumpta est',
    href: 'https://gregobase.selapa.net/download.php?id=2912&format=gabc&elem=1',
  },
  {
    text: 'In odorem',
    href: 'https://gregobase.selapa.net/download.php?id=2963&format=gabc&elem=1',
  },
  {
    text: 'Solis o Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=12309&format=gabc&elem=1',
  },
  {
    text: 'Pulchra es et decora',
    href: 'https://gregobase.selapa.net/download.php?id=12319&format=gabc&elem=1',
  },
  {
    text: 'Benedicta filia tu',
    href: 'https://gregobase.selapa.net/download.php?id=13289&format=gabc',
  },
  {
    text: 'Benedicta filia',
    href: 'https://gregobase.selapa.net/download.php?id=2947&format=gabc&elem=1',
  },
  {
    text: 'Pulchra es et decora',
    href: 'https://gregobase.selapa.net/download.php?id=2861&format=gabc&elem=1',
  },
  {
    text: 'Solis o Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=2067&format=gabc&elem=1',
  },
  {
    text: 'Quae est ista quae ascendit',
    href: 'https://gregobase.selapa.net/download.php?id=11907&format=gabc&elem=1',
  },
  {
    text: 'Benedicta filia tu',
    href: 'https://gregobase.selapa.net/download.php?id=12192&format=gabc',
  },
  {
    text: 'In odorem unguentorum',
    href: 'https://gregobase.selapa.net/download.php?id=12490&format=gabc',
  },
  {
    text: 'Quae est ista quae ascendit',
    href: 'https://gregobase.selapa.net/download.php?id=2730&format=gabc&elem=1',
  },
  {
    text: 'Exaltata est sancta',
    href: 'https://gregobase.selapa.net/download.php?id=13238&format=gabc',
  },
  {
    text: 'Exaltata est Sancta Dei Genitrix',
    href: 'https://gregobase.selapa.net/download.php?id=3151&format=gabc&elem=1',
  },
  {
    text: 'Assumpta est Maria',
    href: 'https://gregobase.selapa.net/download.php?id=3113&format=gabc&elem=1',
  },
  {
    text: 'Assumpta est Maria',
    href: 'https://gregobase.selapa.net/download.php?id=12865&format=gabc&elem=1',
  },
  {
    text: 'Maria Virgo assumpta est',
    href: 'https://gregobase.selapa.net/download.php?id=11807&format=gabc&elem=1',
  },
  {
    text: 'Maria Virgo assumpta est',
    href: 'https://gregobase.selapa.net/download.php?id=3203&format=gabc&elem=1',
  },
  {
    text: 'Hodie Maria Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=11865&format=gabc',
  },
  {
    text: 'Laudemus virum gloriosum',
    href: 'https://gregobase.selapa.net/download.php?id=12532&format=gabc',
  },
  {
    text: 'Hodie Maria Virgo caelos',
    href: 'https://gregobase.selapa.net/download.php?id=2700&format=gabc&elem=1',
  },
  {
    text: 'Laudemus virum',
    href: 'https://gregobase.selapa.net/download.php?id=1869&format=gabc&elem=1',
  },
  {
    text: 'Exsultavit ... ex exaltatum est',
    href: 'https://gregobase.selapa.net/download.php?id=13101&format=gabc',
  },
  {
    text: 'O beata Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=13159&format=gabc',
  },
  {
    text: 'Misso Herodes spiculatore',
    href: 'https://gregobase.selapa.net/download.php?id=13174&format=gabc',
  },
  {
    text: 'Domine mi rex',
    href: 'https://gregobase.selapa.net/download.php?id=12427&format=gabc&elem=1',
  },
  {
    text: 'Herodes enim tenuit',
    href: 'https://gregobase.selapa.net/download.php?id=12646&format=gabc',
  },
  {
    text: 'Puellae saltanti',
    href: 'https://gregobase.selapa.net/download.php?id=13039&format=gabc&elem=1',
  },
  {
    text: 'Arguebat Herodem',
    href: 'https://gregobase.selapa.net/download.php?id=13068&format=gabc&elem=1',
  },
  {
    text: 'Herodes enim tenuit',
    href: 'https://gregobase.selapa.net/download.php?id=2185&format=gabc',
  },
  {
    text: 'Domine mi rex',
    href: 'https://gregobase.selapa.net/download.php?id=2693&format=gabc&elem=1',
  },
  {
    text: 'Puellae saltanti',
    href: 'https://gregobase.selapa.net/download.php?id=2723&format=gabc&elem=1',
  },
  {
    text: 'Arguebat Herodem',
    href: 'https://gregobase.selapa.net/download.php?id=2507&format=gabc&elem=1',
  },
  {
    text: 'Da mihi in disco',
    href: 'https://gregobase.selapa.net/download.php?id=13165&format=gabc&elem=1',
  },
  {
    text: 'Da mihi in disco',
    href: 'https://gregobase.selapa.net/download.php?id=2489&format=gabc&elem=1',
  },
  {
    text: 'Misit rex incredulus',
    href: 'https://gregobase.selapa.net/download.php?id=2584&format=gabc&elem=1',
  },
  {
    text: 'Misit rex incredulus',
    href: 'https://gregobase.selapa.net/download.php?id=12033&format=gabc&elem=1',
  },
  {
    text: 'Gloriosae Virginis Mariae ortum',
    href: 'https://gregobase.selapa.net/download.php?id=12913&format=gabc',
  },
  {
    text: 'Nativitas gloriosae Virginis',
    href: 'https://gregobase.selapa.net/download.php?id=12461&format=gabc',
  },
  {
    text: 'Nativitas est hodie',
    href: 'https://gregobase.selapa.net/download.php?id=12656&format=gabc&elem=1',
  },
  {
    text: 'Regali ex progenie',
    href: 'https://gregobase.selapa.net/download.php?id=13294&format=gabc&elem=1',
  },
  {
    text: 'Nativitas est hodie',
    href: 'https://gregobase.selapa.net/download.php?id=2862&format=gabc&elem=1',
  },
  {
    text: 'Regali ex progenie',
    href: 'https://gregobase.selapa.net/download.php?id=2748&format=gabc&elem=1',
  },
  {
    text: 'Corde et animo Christo',
    href: 'https://gregobase.selapa.net/download.php?id=12874&format=gabc',
  },
  {
    text: 'Corde et animo',
    href: 'https://gregobase.selapa.net/download.php?id=2154&format=gabc&elem=1',
  },
  {
    text: 'Cum jucunditate Nativitatem',
    href: 'https://gregobase.selapa.net/download.php?id=1835&format=gabc&elem=1',
  },
  {
    text: 'Cum jucunditate Nativitatem',
    href: 'https://gregobase.selapa.net/download.php?id=11795&format=gabc&elem=1',
  },
  {
    text: 'Nativitatem hodiernam',
    href: 'https://gregobase.selapa.net/download.php?id=13064&format=gabc',
  },
  {
    text: 'Nativitas tua Dei Genitrix',
    href: 'https://gregobase.selapa.net/download.php?id=12629&format=gabc',
  },
  {
    text: 'Nativitas tua',
    href: 'https://gregobase.selapa.net/download.php?id=1985&format=gabc&elem=1',
  },
  {
    text: 'O Crux benedicta quae sola',
    href: 'https://gregobase.selapa.net/download.php?id=13151&format=gabc',
  },
  {
    text: 'O crux benedicta quae',
    href: 'https://gregobase.selapa.net/download.php?id=1920&format=gabc&elem=1',
  },
  {
    text: 'Jam toto subitus',
    href: 'https://gregobase.selapa.net/download.php?id=12621&format=gabc&elem=1',
  },
  {
    text: 'Jam toto subitus',
    href: 'https://gregobase.selapa.net/download.php?id=2781&format=gabc&elem=1',
  },
  {
    text: 'Nolite me considerare',
    href: 'https://gregobase.selapa.net/download.php?id=12088&format=gabc&elem=1',
  },
  {
    text: 'Nolite me considerare',
    href: 'https://gregobase.selapa.net/download.php?id=2343&format=gabc&elem=1',
  },
  {
    text: 'Recedite a me',
    href: 'https://gregobase.selapa.net/download.php?id=11825&format=gabc&elem=1',
  },
  {
    text: 'Quo abiit dilectus (VII. Dol. Sept.)',
    href: 'https://gregobase.selapa.net/download.php?id=11977&format=gabc',
  },
  {
    text: 'A planta pedis',
    href: 'https://gregobase.selapa.net/download.php?id=11985&format=gabc&elem=1',
  },
  {
    text: 'Non est ei species',
    href: 'https://gregobase.selapa.net/download.php?id=12512&format=gabc&elem=1',
  },
  {
    text: 'Quo abiit (Sept 15)',
    href: 'https://gregobase.selapa.net/download.php?id=2228&format=gabc&elem=1',
  },
  {
    text: 'Recedite a me',
    href: 'https://gregobase.selapa.net/download.php?id=1878&format=gabc&elem=1',
  },
  {
    text: 'Non est ei species',
    href: 'https://gregobase.selapa.net/download.php?id=2646&format=gabc&elem=1',
  },
  {
    text: 'A planta pedis',
    href: 'https://gregobase.selapa.net/download.php?id=1967&format=gabc&elem=1',
  },
  {
    text: 'Fulcite me floribus',
    href: 'https://gregobase.selapa.net/download.php?id=12925&format=gabc&elem=1',
  },
  {
    text: 'Fulcite me floribus',
    href: 'https://gregobase.selapa.net/download.php?id=13050&format=gabc&elem=1',
  },
  {
    text: 'Summae Deus clementiae',
    href: 'https://gregobase.selapa.net/download.php?id=13067&format=gabc',
  },
  {
    text: 'Fulcite me floribus',
    href: 'https://gregobase.selapa.net/download.php?id=2900&format=gabc&elem=1',
  },
  {
    text: 'Venite ascendamus',
    href: 'https://gregobase.selapa.net/download.php?id=13316&format=gabc',
  },
  {
    text: 'Defecerunt prae lacrimis',
    href: 'https://gregobase.selapa.net/download.php?id=11970&format=gabc',
  },
  {
    text: 'O vos omnes',
    href: 'https://gregobase.selapa.net/download.php?id=12610&format=gabc&elem=1',
  },
  {
    text: 'O vos omnes',
    href: 'https://gregobase.selapa.net/download.php?id=3179&format=gabc&elem=1',
  },
  {
    text: 'Defecerunt',
    href: 'https://gregobase.selapa.net/download.php?id=3154&format=gabc&elem=1',
  },
  {
    text: 'Fasciculus myrrhae',
    href: 'https://gregobase.selapa.net/download.php?id=3126&format=gabc&elem=1',
  },
  {
    text: 'Fasciculus myrrhae',
    href: 'https://gregobase.selapa.net/download.php?id=11854&format=gabc&elem=1',
  },
  {
    text: 'Oppressit me dolor',
    href: 'https://gregobase.selapa.net/download.php?id=11897&format=gabc&elem=1',
  },
  {
    text: 'Oppressit me dolor',
    href: 'https://gregobase.selapa.net/download.php?id=1980&format=gabc&elem=1',
  },
  {
    text: 'Mortuus sum et vita',
    href: 'https://gregobase.selapa.net/download.php?id=12444&format=gabc',
  },
  {
    text: 'Mortuus sum',
    href: 'https://gregobase.selapa.net/download.php?id=2273&format=gabc&elem=1',
  },
  {
    text: 'Existimo omnia',
    href: 'https://gregobase.selapa.net/download.php?id=12579&format=gabc&elem=1',
  },
  {
    text: 'Ostendit mihi Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=13261&format=gabc',
  },
  {
    text: 'Existimo omnia',
    href: 'https://gregobase.selapa.net/download.php?id=2823&format=gabc&elem=1',
  },
  {
    text: 'Eleemosynas illius',
    href: 'https://gregobase.selapa.net/download.php?id=12848&format=gabc',
  },
  {
    text: 'Dispersit dedit pauperibus',
    href: 'https://gregobase.selapa.net/download.php?id=13177&format=gabc',
  },
  {
    text: 'Dispersit dedit',
    href: 'https://gregobase.selapa.net/download.php?id=2419&format=gabc&elem=1',
  },
  {
    text: 'Te splendor et virtus',
    href: 'https://gregobase.selapa.net/download.php?id=12714&format=gabc&elem=1',
  },
  {
    text: 'Te splendor et virtus (2)',
    href: 'https://gregobase.selapa.net/download.php?id=2460&format=gabc&elem=1',
  },
  {
    text: 'Dum sacrum mysterium',
    href: 'https://gregobase.selapa.net/download.php?id=11784&format=gabc&elem=1',
  },
  {
    text: 'Dum sacrum mysterium',
    href: 'https://gregobase.selapa.net/download.php?id=2640&format=gabc&elem=1',
  },
  {
    text: 'Dum praeliaretur Michael',
    href: 'https://gregobase.selapa.net/download.php?id=11947&format=gabc',
  },
  {
    text: 'Stetit Angelus juxta',
    href: 'https://gregobase.selapa.net/download.php?id=12955&format=gabc',
  },
  {
    text: 'Archangele Michael',
    href: 'https://gregobase.selapa.net/download.php?id=13167&format=gabc&elem=1',
  },
  {
    text: 'Dum praeliaretur',
    href: 'https://gregobase.selapa.net/download.php?id=1868&format=gabc&elem=1',
  },
  {
    text: 'Archangele Michael',
    href: 'https://gregobase.selapa.net/download.php?id=2245&format=gabc&elem=1',
  },
  {
    text: 'Angeli Domini Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=12520&format=gabc',
  },
  {
    text: 'Christe Sanctorum (S. Mich.)',
    href: 'https://gregobase.selapa.net/download.php?id=12915&format=gabc',
  },
  {
    text: 'Angeli Domini',
    href: 'https://gregobase.selapa.net/download.php?id=2074&format=gabc&elem=1',
  },
  {
    text: 'Angeli Archangeli...caelorum',
    href: 'https://gregobase.selapa.net/download.php?id=2791&format=gabc&elem=1',
  },
  {
    text: 'Angeli Archangeli (S. Michael.)',
    href: 'https://gregobase.selapa.net/download.php?id=12523&format=gabc&elem=1',
  },
  {
    text: 'Factum est silentium',
    href: 'https://gregobase.selapa.net/download.php?id=11856&format=gabc',
  },
  {
    text: 'Stetit Angelus juxta',
    href: 'https://gregobase.selapa.net/download.php?id=13314&format=gabc',
  },
  {
    text: 'Stetit Angelus',
    href: 'https://gregobase.selapa.net/download.php?id=3137&format=gabc&elem=1',
  },
  {
    text: 'Ascendit fumus aromatum',
    href: 'https://gregobase.selapa.net/download.php?id=12016&format=gabc',
  },
  {
    text: 'Stetit Angelus juxta (T. Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=12981&format=gabc',
  },
  {
    text: 'Ascendit fumus aromatum (T. Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=13027&format=gabc',
  },
  {
    text: 'Stetit Angelus (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3210&format=gabc&elem=1',
  },
  {
    text: 'Ascendit fumus',
    href: 'https://gregobase.selapa.net/download.php?id=3138&format=gabc&elem=1',
  },
  {
    text: 'Ascendit fumus (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3096&format=gabc&elem=1',
  },
  {
    text: 'In conspectu Angelorum',
    href: 'https://gregobase.selapa.net/download.php?id=12517&format=gabc&elem=1',
  },
  {
    text: 'In conspectu Angelorum',
    href: 'https://gregobase.selapa.net/download.php?id=3224&format=gabc&elem=1',
  },
  {
    text: 'In conspectu Angelorum (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3079&format=gabc&elem=1',
  },
  {
    text: 'Princeps gloriosissime Michael',
    href: 'https://gregobase.selapa.net/download.php?id=2625&format=gabc&elem=1',
  },
  {
    text: 'Princeps gloriosissime',
    href: 'https://gregobase.selapa.net/download.php?id=12431&format=gabc&elem=1',
  },
  {
    text: 'Custodes hominum psallimus',
    href: 'https://gregobase.selapa.net/download.php?id=13140&format=gabc',
  },
  {
    text: 'Angelis suis Deus',
    href: 'https://gregobase.selapa.net/download.php?id=11975&format=gabc',
  },
  {
    text: 'Laudemus Dominum quem',
    href: 'https://gregobase.selapa.net/download.php?id=12255&format=gabc',
  },
  {
    text: 'Omnes sunt administratorii',
    href: 'https://gregobase.selapa.net/download.php?id=13104&format=gabc',
  },
  {
    text: 'Angelis suis',
    href: 'https://gregobase.selapa.net/download.php?id=2562&format=gabc&elem=1',
  },
  {
    text: 'Benedictus Deus qui misit',
    href: 'https://gregobase.selapa.net/download.php?id=11988&format=gabc&elem=1',
  },
  {
    text: 'Laudate Deum omnes Angeli',
    href: 'https://gregobase.selapa.net/download.php?id=12265&format=gabc',
  },
  {
    text: 'Angeli eorum ... qui est in caelis',
    href: 'https://gregobase.selapa.net/download.php?id=13121&format=gabc',
  },
  {
    text: 'Angeli eorum... Patris mei',
    href: 'https://gregobase.selapa.net/download.php?id=2727&format=gabc&elem=1',
  },
  {
    text: 'Benedictus Deus qui misit',
    href: 'https://gregobase.selapa.net/download.php?id=2252&format=gabc&elem=1',
  },
  {
    text: 'Laudate Deum',
    href: 'https://gregobase.selapa.net/download.php?id=1998&format=gabc&elem=1',
  },
  {
    text: 'Aeterne Rector siderum',
    href: 'https://gregobase.selapa.net/download.php?id=13338&format=gabc',
  },
  {
    text: 'Reversus est Angelus',
    href: 'https://gregobase.selapa.net/download.php?id=13230&format=gabc',
  },
  {
    text: 'Sancti Angeli Custodes',
    href: 'https://gregobase.selapa.net/download.php?id=12919&format=gabc&elem=1',
  },
  {
    text: 'Sancti Angeli Custodes',
    href: 'https://gregobase.selapa.net/download.php?id=2860&format=gabc&elem=1',
  },
  {
    text: 'Quae est ista speciosa',
    href: 'https://gregobase.selapa.net/download.php?id=11821&format=gabc&elem=1',
  },
  {
    text: 'Virgo potens sicut turris',
    href: 'https://gregobase.selapa.net/download.php?id=12954&format=gabc',
  },
  {
    text: 'Quae est ista speciosa',
    href: 'https://gregobase.selapa.net/download.php?id=2921&format=gabc&elem=1',
  },
  {
    text: 'Virgo potens',
    href: 'https://gregobase.selapa.net/download.php?id=2193&format=gabc&elem=1',
  },
  {
    text: 'Ave Maria',
    href: 'https://gregobase.selapa.net/download.php?id=12056&format=gabc&elem=1',
  },
  {
    text: 'Benedixit te Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12091&format=gabc&elem=1',
  },
  {
    text: 'Viderunt eam ... vernantem',
    href: 'https://gregobase.selapa.net/download.php?id=12194&format=gabc',
  },
  {
    text: 'Ave Maria',
    href: 'https://gregobase.selapa.net/download.php?id=12596&format=gabc&elem=1',
  },
  {
    text: 'Ave Maria',
    href: 'https://gregobase.selapa.net/download.php?id=2844&format=gabc&elem=1',
  },
  {
    text: 'Benedixit te Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2312&format=gabc&elem=1',
  },
  {
    text: 'Viderunt eam filiae Sion vernantem',
    href: 'https://gregobase.selapa.net/download.php?id=2701&format=gabc&elem=1',
  },
  {
    text: 'Caelestis aulae Nuntius',
    href: 'https://gregobase.selapa.net/download.php?id=12951&format=gabc',
  },
  {
    text: 'Caelestis aulae nuntius',
    href: 'https://gregobase.selapa.net/download.php?id=2615&format=gabc&elem=1',
  },
  {
    text: 'Beata es Virgo Maria Dei G.',
    href: 'https://gregobase.selapa.net/download.php?id=11911&format=gabc',
  },
  {
    text: 'Beata es Virgo Maria Dei',
    href: 'https://gregobase.selapa.net/download.php?id=2960&format=gabc&elem=1',
  },
  {
    text: 'Laetare Virgo Mater',
    href: 'https://gregobase.selapa.net/download.php?id=12443&format=gabc',
  },
  {
    text: 'Ascendit Deus',
    href: 'https://gregobase.selapa.net/download.php?id=12450&format=gabc&elem=1',
  },
  {
    text: 'Assumpta est Maria ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=13000&format=gabc',
  },
  {
    text: 'Laetare',
    href: 'https://gregobase.selapa.net/download.php?id=1966&format=gabc&elem=1',
  },
  {
    text: 'Ascendit Deus',
    href: 'https://gregobase.selapa.net/download.php?id=2136&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Domini replevit',
    href: 'https://gregobase.selapa.net/download.php?id=12623&format=gabc&elem=1',
  },
  {
    text: 'Spiritus Domini replevit',
    href: 'https://gregobase.selapa.net/download.php?id=12938&format=gabc&elem=1',
  },
  {
    text: 'Exaltata est Virgo Maria',
    href: 'https://gregobase.selapa.net/download.php?id=12657&format=gabc&elem=1',
  },
  {
    text: 'Jam morte victor obruta',
    href: 'https://gregobase.selapa.net/download.php?id=12800&format=gabc',
  },
  {
    text: 'Exaltata est Virgo Maria',
    href: 'https://gregobase.selapa.net/download.php?id=2763&format=gabc&elem=1',
  },
  {
    text: 'Solemnitatem hodiernam',
    href: 'https://gregobase.selapa.net/download.php?id=13287&format=gabc',
  },
  {
    text: 'Sancta Dei Genitrix',
    href: 'https://gregobase.selapa.net/download.php?id=12716&format=gabc',
  },
  {
    text: 'Speciosa facta es',
    href: 'https://gregobase.selapa.net/download.php?id=12221&format=gabc',
  },
  {
    text: 'Post partum Virgo',
    href: 'https://gregobase.selapa.net/download.php?id=12674&format=gabc',
  },
  {
    text: 'Post partum',
    href: 'https://gregobase.selapa.net/download.php?id=3196&format=gabc&elem=1',
  },
  {
    text: 'Speciosa facta es (Resp Br)',
    href: 'https://gregobase.selapa.net/download.php?id=3209&format=gabc&elem=1',
  },
  {
    text: 'Te gestientem gaudiis',
    href: 'https://gregobase.selapa.net/download.php?id=11786&format=gabc',
  },
  {
    text: 'Beata Mater...Regina mundi sentiant',
    href: 'https://gregobase.selapa.net/download.php?id=1871&format=gabc&elem=1',
  },
  {
    text: 'Beata Mater et intacta... sentiant',
    href: 'https://gregobase.selapa.net/download.php?id=13086&format=gabc&elem=1',
  },
  {
    text: 'Beata es Virgo Maria quae',
    href: 'https://gregobase.selapa.net/download.php?id=12505&format=gabc',
  },
  {
    text: 'Cum jucunditate Maternitatem',
    href: 'https://gregobase.selapa.net/download.php?id=12976&format=gabc&elem=1',
  },
  {
    text: 'Cum jucunditate Maternitatem',
    href: 'https://gregobase.selapa.net/download.php?id=1872&format=gabc&elem=1',
  },
  {
    text: 'Beata es Virgo Maria quae (Ant)',
    href: 'https://gregobase.selapa.net/download.php?id=2360&format=gabc&elem=1',
  },
  {
    text: 'Viderunt eam ... et beatam',
    href: 'https://gregobase.selapa.net/download.php?id=12063&format=gabc',
  },
  {
    text: 'Benedicta filia tu',
    href: 'https://gregobase.selapa.net/download.php?id=12192&format=gabc',
  },
  {
    text: 'Genuisti qui te fecit',
    href: 'https://gregobase.selapa.net/download.php?id=12619&format=gabc&elem=1',
  },
  {
    text: 'Cum essem parvula',
    href: 'https://gregobase.selapa.net/download.php?id=13075&format=gabc&elem=1',
  },
  {
    text: 'Benedicta filia tu',
    href: 'https://gregobase.selapa.net/download.php?id=13289&format=gabc',
  },
  {
    text: 'Genuisti qui te fecit',
    href: 'https://gregobase.selapa.net/download.php?id=2582&format=gabc&elem=1',
  },
  {
    text: 'Cum essem parvula',
    href: 'https://gregobase.selapa.net/download.php?id=2954&format=gabc&elem=1',
  },
  {
    text: 'Benedicta filia',
    href: 'https://gregobase.selapa.net/download.php?id=2947&format=gabc&elem=1',
  },
  {
    text: 'Viderunt eam... et beatam',
    href: 'https://gregobase.selapa.net/download.php?id=2848&format=gabc&elem=1',
  },
  {
    text: 'Te Mater alma Numinis',
    href: 'https://gregobase.selapa.net/download.php?id=11767&format=gabc',
  },
  {
    text: 'Sancta Maria succurre',
    href: 'https://gregobase.selapa.net/download.php?id=12669&format=gabc',
  },
  {
    text: 'Maternitas tua',
    href: 'https://gregobase.selapa.net/download.php?id=12141&format=gabc&elem=1',
  },
  {
    text: 'Maternitas tua',
    href: 'https://gregobase.selapa.net/download.php?id=2366&format=gabc&elem=1',
  },
  {
    text: 'Regis superni nuntia',
    href: 'https://gregobase.selapa.net/download.php?id=13035&format=gabc&elem=1',
  },
  {
    text: 'Regis superni nuntia',
    href: 'https://gregobase.selapa.net/download.php?id=2591&format=gabc&elem=1',
  },
  {
    text: 'Haec est dies qua candidae',
    href: 'https://gregobase.selapa.net/download.php?id=12680&format=gabc',
  },
  {
    text: 'Gentis Polonae gloria',
    href: 'https://gregobase.selapa.net/download.php?id=12628&format=gabc',
  },
  {
    text: 'Gentis Polonae',
    href: 'https://gregobase.selapa.net/download.php?id=2644&format=gabc&elem=1',
  },
  {
    text: 'Te deprecante corporum',
    href: 'https://gregobase.selapa.net/download.php?id=13082&format=gabc',
  },
  {
    text: 'Christe Sanctorum (S. Raph.)',
    href: 'https://gregobase.selapa.net/download.php?id=12037&format=gabc',
  },
  {
    text: 'Missus est Angelus Raphael',
    href: 'https://gregobase.selapa.net/download.php?id=11916&format=gabc&elem=1',
  },
  {
    text: 'Ego sum Raphael',
    href: 'https://gregobase.selapa.net/download.php?id=12385&format=gabc&elem=1',
  },
  {
    text: 'Ego sum Raphael',
    href: 'https://gregobase.selapa.net/download.php?id=2630&format=gabc&elem=1',
  },
  {
    text: 'Missus est Angelus Raphael',
    href: 'https://gregobase.selapa.net/download.php?id=1880&format=gabc&elem=1',
  },
  {
    text: 'Benedicite Deum caeli',
    href: 'https://gregobase.selapa.net/download.php?id=11862&format=gabc',
  },
  {
    text: 'Pax vobis nolite',
    href: 'https://gregobase.selapa.net/download.php?id=11906&format=gabc',
  },
  {
    text: 'Ingressus Angelus ad Tobiam',
    href: 'https://gregobase.selapa.net/download.php?id=11940&format=gabc',
  },
  {
    text: 'Forti animo esto',
    href: 'https://gregobase.selapa.net/download.php?id=13122&format=gabc',
  },
  {
    text: 'Ingressus Angelus',
    href: 'https://gregobase.selapa.net/download.php?id=2756&format=gabc&elem=1',
  },
  {
    text: 'Forti animo',
    href: 'https://gregobase.selapa.net/download.php?id=2617&format=gabc&elem=1',
  },
  {
    text: 'Benedicite Deum',
    href: 'https://gregobase.selapa.net/download.php?id=2632&format=gabc&elem=1',
  },
  {
    text: 'Pax vobis',
    href: 'https://gregobase.selapa.net/download.php?id=2528&format=gabc&elem=1',
  },
  {
    text: 'Placare Christe (S. Raph.)',
    href: 'https://gregobase.selapa.net/download.php?id=12018&format=gabc',
  },
  {
    text: 'Ego sum Raphael ... alleluia',
    href: 'https://gregobase.selapa.net/download.php?id=13156&format=gabc',
  },
  {
    text: 'Princeps gloriosissime (S. Raph.)',
    href: 'https://gregobase.selapa.net/download.php?id=11978&format=gabc',
  },
  {
    text: 'Princeps gloriosissime Raphael',
    href: 'https://gregobase.selapa.net/download.php?id=2061&format=gabc&elem=1',
  },
  {
    text: 'Pacificus vocabitur',
    href: 'https://gregobase.selapa.net/download.php?id=2581&format=gabc&elem=1',
  },
  {
    text: 'Pacificus vocabitur',
    href: 'https://gregobase.selapa.net/download.php?id=13126&format=gabc&elem=1',
  },
  {
    text: 'Regnum ejus',
    href: 'https://gregobase.selapa.net/download.php?id=1949&format=gabc&elem=1',
  },
  {
    text: 'Ecce vir Oriens',
    href: 'https://gregobase.selapa.net/download.php?id=2448&format=gabc&elem=1',
  },
  {
    text: 'Ecce vir Oriens',
    href: 'https://gregobase.selapa.net/download.php?id=13224&format=gabc&elem=1',
  },
  {
    text: 'Te saeculorum Principem',
    href: 'https://gregobase.selapa.net/download.php?id=12902&format=gabc&elem=1',
  },
  {
    text: 'Dominus judex',
    href: 'https://gregobase.selapa.net/download.php?id=2724&format=gabc',
  },
  {
    text: 'Dominus judex noster',
    href: 'https://gregobase.selapa.net/download.php?id=12406&format=gabc',
  },
  {
    text: 'Ecce dedi te',
    href: 'https://gregobase.selapa.net/download.php?id=2676&format=gabc&elem=1',
  },
  {
    text: 'Ecce dedi te',
    href: 'https://gregobase.selapa.net/download.php?id=12044&format=gabc&elem=1',
  },
  {
    text: 'Te saeculorum Principem',
    href: 'https://gregobase.selapa.net/download.php?id=2654&format=gabc&elem=1',
  },
  {
    text: 'Te lucis ante terminum (In Festo D. N. J. C. Regis)',
    href: 'https://gregobase.selapa.net/download.php?id=11806&format=gabc',
  },
  {
    text: 'Dabit illi Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2668&format=gabc&elem=1',
  },
  {
    text: 'Dabit illi Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=13269&format=gabc&elem=1',
  },
  {
    text: 'Suscitabit Deus',
    href: 'https://gregobase.selapa.net/download.php?id=11853&format=gabc',
  },
  {
    text: 'Dedit ei Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12946&format=gabc',
  },
  {
    text: 'Dedit ei Dominus potestatem',
    href: 'https://gregobase.selapa.net/download.php?id=1982&format=gabc&elem=1',
  },
  {
    text: 'Exibunt aquae vivae',
    href: 'https://gregobase.selapa.net/download.php?id=12085&format=gabc&elem=1',
  },
  {
    text: 'Gens et regnum',
    href: 'https://gregobase.selapa.net/download.php?id=12247&format=gabc&elem=1',
  },
  {
    text: 'Magnificabitur',
    href: 'https://gregobase.selapa.net/download.php?id=12935&format=gabc',
  },
  {
    text: 'Exibunt aquae vivae',
    href: 'https://gregobase.selapa.net/download.php?id=2302&format=gabc&elem=1',
  },
  {
    text: 'Magnificabitur usque ad terminos',
    href: 'https://gregobase.selapa.net/download.php?id=2259&format=gabc&elem=1',
  },
  {
    text: 'Gens et regnum',
    href: 'https://gregobase.selapa.net/download.php?id=2326&format=gabc&elem=1',
  },
  {
    text: 'Vexilla Christus inclyta',
    href: 'https://gregobase.selapa.net/download.php?id=12113&format=gabc',
  },
  {
    text: 'Vexilla Christus',
    href: 'https://gregobase.selapa.net/download.php?id=2588&format=gabc&elem=1',
  },
  {
    text: 'Fecit nos Deo',
    href: 'https://gregobase.selapa.net/download.php?id=13180&format=gabc',
  },
  {
    text: 'Nunc Sancte nobis Spiritus (In festo D. N. J. C. Regis)',
    href: 'https://gregobase.selapa.net/download.php?id=12154&format=gabc',
  },
  {
    text: 'Afferte Domino familiae',
    href: 'https://gregobase.selapa.net/download.php?id=12293&format=gabc&elem=1',
  },
  {
    text: 'Data est mihi',
    href: 'https://gregobase.selapa.net/download.php?id=12735&format=gabc&elem=1',
  },
  {
    text: 'Afferte Domino familiae',
    href: 'https://gregobase.selapa.net/download.php?id=3123&format=gabc&elem=1',
  },
  {
    text: 'Adorabunt eum',
    href: 'https://gregobase.selapa.net/download.php?id=11932&format=gabc&elem=1',
  },
  {
    text: 'Adorabunt eum',
    href: 'https://gregobase.selapa.net/download.php?id=3085&format=gabc&elem=1',
  },
  {
    text: 'Habet in vestimento',
    href: 'https://gregobase.selapa.net/download.php?id=2139&format=gabc&elem=1',
  },
  {
    text: 'Habet in vestimento',
    href: 'https://gregobase.selapa.net/download.php?id=12709&format=gabc&elem=1',
  },
  {
    text: 'Placare Christe (Omn. Sanct.)',
    href: 'https://gregobase.selapa.net/download.php?id=11738&format=gabc',
  },
  {
    text: 'Angeli Archangeli (Omn. Sanct.)',
    href: 'https://gregobase.selapa.net/download.php?id=12685&format=gabc&elem=1',
  },
  {
    text: 'Angeli Archangeli (Omn. Sanct.)',
    href: 'https://gregobase.selapa.net/download.php?id=1991&format=gabc&elem=1',
  },
  {
    text: 'Vidi turbam magnam',
    href: 'https://gregobase.selapa.net/download.php?id=12773&format=gabc&elem=1',
  },
  {
    text: 'Et omnes Angeli stabant',
    href: 'https://gregobase.selapa.net/download.php?id=12873&format=gabc',
  },
  {
    text: 'Vidi turbam magnam',
    href: 'https://gregobase.selapa.net/download.php?id=2883&format=gabc&elem=1',
  },
  {
    text: 'Et omnes Angeli',
    href: 'https://gregobase.selapa.net/download.php?id=2634&format=gabc&elem=1',
  },
  {
    text: 'Benedicite Dominum omnes',
    href: 'https://gregobase.selapa.net/download.php?id=12072&format=gabc',
  },
  {
    text: 'Hymnus omnibus Sanctis',
    href: 'https://gregobase.selapa.net/download.php?id=12077&format=gabc',
  },
  {
    text: 'Redemisti nos Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12699&format=gabc&elem=1',
  },
  {
    text: 'Redemisti nos Domine (Ant)',
    href: 'https://gregobase.selapa.net/download.php?id=1999&format=gabc&elem=1',
  },
  {
    text: 'Benedicite Dominum omnes electi',
    href: 'https://gregobase.selapa.net/download.php?id=2109&format=gabc&elem=1',
  },
  {
    text: 'Hymnus omnibus sanctis',
    href: 'https://gregobase.selapa.net/download.php?id=2328&format=gabc&elem=1',
  },
  {
    text: 'Salutis aeternae dator',
    href: 'https://gregobase.selapa.net/download.php?id=12156&format=gabc&elem=1',
  },
  {
    text: 'Salutis aeternae dator',
    href: 'https://gregobase.selapa.net/download.php?id=2520&format=gabc&elem=1',
  },
  {
    text: 'Te gloriosus Apostolorum',
    href: 'https://gregobase.selapa.net/download.php?id=11841&format=gabc',
  },
  {
    text: 'Te gloriosus',
    href: 'https://gregobase.selapa.net/download.php?id=2233&format=gabc&elem=1',
  },
  {
    text: 'O quam gloriosum est regnum',
    href: 'https://gregobase.selapa.net/download.php?id=2216&format=gabc&elem=1',
  },
  {
    text: 'O quam gloriosum est',
    href: 'https://gregobase.selapa.net/download.php?id=13084&format=gabc&elem=1',
  },
  {
    text: 'O beatum virum cujus',
    href: 'https://gregobase.selapa.net/download.php?id=13175&format=gabc',
  },
  {
    text: 'O beatum virum cujus anima',
    href: 'https://gregobase.selapa.net/download.php?id=2887&format=gabc&elem=1',
  },
  {
    text: 'O virum ineffabilem',
    href: 'https://gregobase.selapa.net/download.php?id=11735&format=gabc&elem=1',
  },
  {
    text: 'Dixerunt discipuli',
    href: 'https://gregobase.selapa.net/download.php?id=12666&format=gabc&elem=1',
  },
  {
    text: 'Domine si adhuc populo',
    href: 'https://gregobase.selapa.net/download.php?id=13298&format=gabc',
  },
  {
    text: 'Dixerunt discipuli',
    href: 'https://gregobase.selapa.net/download.php?id=2785&format=gabc&elem=1',
  },
  {
    text: 'Domine si adhuc',
    href: 'https://gregobase.selapa.net/download.php?id=2585&format=gabc&elem=1',
  },
  {
    text: 'O virum ineffabilem',
    href: 'https://gregobase.selapa.net/download.php?id=2968&format=gabc&elem=1',
  },
  {
    text: 'Oculis ac manibus',
    href: 'https://gregobase.selapa.net/download.php?id=12896&format=gabc&elem=1',
  },
  {
    text: 'Martinus Abrahae sinu',
    href: 'https://gregobase.selapa.net/download.php?id=13179&format=gabc&elem=1',
  },
  {
    text: 'Oculis ac manibus',
    href: 'https://gregobase.selapa.net/download.php?id=2155&format=gabc&elem=1',
  },
  {
    text: 'Martinus Abrahae sinu',
    href: 'https://gregobase.selapa.net/download.php?id=2192&format=gabc&elem=1',
  },
  {
    text: 'O beatum Pontificem qui totis',
    href: 'https://gregobase.selapa.net/download.php?id=12751&format=gabc',
  },
  {
    text: 'O beatum Pontificem',
    href: 'https://gregobase.selapa.net/download.php?id=2378&format=gabc&elem=1',
  },
  {
    text: 'Beata Dei Genitrix (Praesent.)',
    href: 'https://gregobase.selapa.net/download.php?id=12249&format=gabc',
  },
  {
    text: 'Beata Dei Genitrix (Presentation)',
    href: 'https://gregobase.selapa.net/download.php?id=1932&format=gabc&elem=1',
  },
  {
    text: 'Est secretum Valeriane',
    href: 'https://gregobase.selapa.net/download.php?id=11885&format=gabc',
  },
  {
    text: 'Cantantibus organis',
    href: 'https://gregobase.selapa.net/download.php?id=12214&format=gabc&elem=1',
  },
  {
    text: 'Valerianus in cubiculo',
    href: 'https://gregobase.selapa.net/download.php?id=12986&format=gabc&elem=1',
  },
  {
    text: 'Est secretum',
    href: 'https://gregobase.selapa.net/download.php?id=2853&format=gabc&elem=1',
  },
  {
    text: 'Cantantibus organis',
    href: 'https://gregobase.selapa.net/download.php?id=2184&format=gabc&elem=1',
  },
  {
    text: 'Valerianus in cubiculo',
    href: 'https://gregobase.selapa.net/download.php?id=2554&format=gabc&elem=1',
  },
  {
    text: 'Benedico... Filium',
    href: 'https://gregobase.selapa.net/download.php?id=11757&format=gabc&elem=1',
  },
  {
    text: 'Triduanas a Domino',
    href: 'https://gregobase.selapa.net/download.php?id=12494&format=gabc&elem=1',
  },
  {
    text: 'Caecilia famula tua',
    href: 'https://gregobase.selapa.net/download.php?id=13080&format=gabc&elem=1',
  },
  {
    text: 'Caecilia famula tua',
    href: 'https://gregobase.selapa.net/download.php?id=2402&format=gabc&elem=1',
  },
  {
    text: 'Benedico... Filium',
    href: 'https://gregobase.selapa.net/download.php?id=2039&format=gabc&elem=1',
  },
  {
    text: 'Triduanas a Domino',
    href: 'https://gregobase.selapa.net/download.php?id=2016&format=gabc&elem=1',
  },
  {
    text: 'Dum aurora finem',
    href: 'https://gregobase.selapa.net/download.php?id=12405&format=gabc',
  },
  {
    text: 'Oremus omnes ad Dominum',
    href: 'https://gregobase.selapa.net/download.php?id=12644&format=gabc',
  },
  {
    text: 'Virgo gloriosa semper',
    href: 'https://gregobase.selapa.net/download.php?id=12842&format=gabc',
  },
  {
    text: 'Oremus omnes',
    href: 'https://gregobase.selapa.net/download.php?id=2551&format=gabc&elem=1',
  },
  {
    text: 'Virgo gloriosa',
    href: 'https://gregobase.selapa.net/download.php?id=2380&format=gabc&elem=1',
  },
  {
    text: 'Non meis meritis',
    href: 'https://gregobase.selapa.net/download.php?id=11929&format=gabc&elem=1',
  },
  {
    text: 'Orante sancto Clemente',
    href: 'https://gregobase.selapa.net/download.php?id=12814&format=gabc&elem=1',
  },
  {
    text: 'Vidi supra montem',
    href: 'https://gregobase.selapa.net/download.php?id=13117&format=gabc&elem=1',
  },
  {
    text: 'Orante sancto Clemente',
    href: 'https://gregobase.selapa.net/download.php?id=2278&format=gabc&elem=1',
  },
  {
    text: 'Non meis meritis',
    href: 'https://gregobase.selapa.net/download.php?id=2661&format=gabc&elem=1',
  },
  {
    text: 'Vidi supra montem',
    href: 'https://gregobase.selapa.net/download.php?id=2643&format=gabc&elem=1',
  },
  {
    text: 'Omnes gentes per gyrum',
    href: 'https://gregobase.selapa.net/download.php?id=12402&format=gabc&elem=1',
  },
  {
    text: 'De sub cujus pede fons',
    href: 'https://gregobase.selapa.net/download.php?id=12625&format=gabc',
  },
  {
    text: 'Cum iter ad mare',
    href: 'https://gregobase.selapa.net/download.php?id=12754&format=gabc',
  },
  {
    text: 'De sub cujus pede',
    href: 'https://gregobase.selapa.net/download.php?id=2870&format=gabc&elem=1',
  },
  {
    text: 'Omnes gentes per gyrum',
    href: 'https://gregobase.selapa.net/download.php?id=2020&format=gabc&elem=1',
  },
  {
    text: 'Dedisti Domine habitaculum',
    href: 'https://gregobase.selapa.net/download.php?id=12508&format=gabc&elem=1',
  },
  {
    text: 'Hoc est praeceptum meum',
    href: 'https://gregobase.selapa.net/download.php?id=11997&format=gabc&elem=1',
  },
  {
    text: 'Majorem caritatem',
    href: 'https://gregobase.selapa.net/download.php?id=13062&format=gabc&elem=1',
  },
  {
    text: 'Hoc est praeceptum meum',
    href: 'https://gregobase.selapa.net/download.php?id=2300&format=gabc&elem=1',
  },
  {
    text: 'Majorem caritatem',
    href: 'https://gregobase.selapa.net/download.php?id=2104&format=gabc&elem=1',
  },
  {
    text: 'Vos amici mei estis',
    href: 'https://gregobase.selapa.net/download.php?id=13048&format=gabc&elem=1',
  },
  {
    text: 'Vos amici mei estis',
    href: 'https://gregobase.selapa.net/download.php?id=2202&format=gabc&elem=1',
  },
  {
    text: 'Beati pacifici',
    href: 'https://gregobase.selapa.net/download.php?id=12003&format=gabc&elem=1',
  },
  {
    text: 'Beati pacifici',
    href: 'https://gregobase.selapa.net/download.php?id=1893&format=gabc&elem=1',
  },
  {
    text: 'In patientia vestra',
    href: 'https://gregobase.selapa.net/download.php?id=2594&format=gabc&elem=1',
  },
  {
    text: 'In patientia vestra',
    href: 'https://gregobase.selapa.net/download.php?id=12686&format=gabc&elem=1',
  },
  {
    text: 'Exsultet orbis gaudiis',
    href: 'https://gregobase.selapa.net/download.php?id=12058&format=gabc&elem=1',
  },
  {
    text: 'Exsultet orbis gaudiis',
    href: 'https://gregobase.selapa.net/download.php?id=2194&format=gabc&elem=1',
  },
  {
    text: 'Exsultet orbis gaudiis (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=12342&format=gabc',
  },
  {
    text: 'Exsultet orbis gaudiis (another download)',
    href: 'https://gregobase.selapa.net/download.php?id=2351&format=gabc&elem=1',
  },
  {
    text: 'Vos qui reliquistis omnia',
    href: 'https://gregobase.selapa.net/download.php?id=12597&format=gabc',
  },
  {
    text: 'Tradent enim vos',
    href: 'https://gregobase.selapa.net/download.php?id=2112&format=gabc&elem=1',
  },
  {
    text: 'Tradent enim vos in conciliis',
    href: 'https://gregobase.selapa.net/download.php?id=11886&format=gabc&elem=1',
  },
  {
    text: 'Constitues eos principes',
    href: 'https://gregobase.selapa.net/download.php?id=11801&format=gabc',
  },
  {
    text: 'In omnem terram',
    href: 'https://gregobase.selapa.net/download.php?id=13092&format=gabc&elem=1',
  },
  {
    text: 'In omnem terram',
    href: 'https://gregobase.selapa.net/download.php?id=3187&format=gabc&elem=1',
  },
  {
    text: 'Constitues eos',
    href: 'https://gregobase.selapa.net/download.php?id=3055&format=gabc&elem=1',
  },
  {
    text: 'Collocet eum Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12171&format=gabc&elem=1',
  },
  {
    text: 'Juravit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12647&format=gabc&elem=1',
  },
  {
    text: 'Nimis honorati sunt',
    href: 'https://gregobase.selapa.net/download.php?id=13112&format=gabc&elem=1',
  },
  {
    text: 'Nimis honorati sunt',
    href: 'https://gregobase.selapa.net/download.php?id=3166&format=gabc&elem=1',
  },
  {
    text: 'Juravit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=1973&format=gabc&elem=1',
  },
  {
    text: 'Collocet eum Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2751&format=gabc&elem=1',
  },
  {
    text: 'Dirupisti Domine',
    href: 'https://gregobase.selapa.net/download.php?id=1861&format=gabc&elem=1',
  },
  {
    text: 'Dirupisti Domine vincula',
    href: 'https://gregobase.selapa.net/download.php?id=12888&format=gabc&elem=1',
  },
  {
    text: 'Confortatus est principatus',
    href: 'https://gregobase.selapa.net/download.php?id=11759&format=gabc',
  },
  {
    text: 'Euntes ibant et flebant',
    href: 'https://gregobase.selapa.net/download.php?id=13185&format=gabc',
  },
  {
    text: 'Euntes ibant',
    href: 'https://gregobase.selapa.net/download.php?id=2337&format=gabc&elem=1',
  },
  {
    text: 'Confortatus est',
    href: 'https://gregobase.selapa.net/download.php?id=2079&format=gabc&elem=1',
  },
  {
    text: 'Estote fortes in bello',
    href: 'https://gregobase.selapa.net/download.php?id=11849&format=gabc&elem=1',
  },
  {
    text: 'Estote fortes in bello',
    href: 'https://gregobase.selapa.net/download.php?id=1915&format=gabc&elem=1',
  },
  {
    text: 'Deus tuorum militum',
    href: 'https://gregobase.selapa.net/download.php?id=12849&format=gabc&elem=1',
  },
  {
    text: 'Deus tuorum militum',
    href: 'https://gregobase.selapa.net/download.php?id=2702&format=gabc&elem=1',
  },
  {
    text: 'Deus tuorum militum (another download)',
    href: 'https://gregobase.selapa.net/download.php?id=2789&format=gabc&elem=1',
  },
  {
    text: 'Deus tuorum militum (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=12521&format=gabc&elem=1',
  },
  {
    text: 'Iste sanctus',
    href: 'https://gregobase.selapa.net/download.php?id=2340&format=gabc&elem=1',
  },
  {
    text: 'Iste Sanctus pro lege',
    href: 'https://gregobase.selapa.net/download.php?id=13158&format=gabc',
  },
  {
    text: 'Qui me confessus fuerit',
    href: 'https://gregobase.selapa.net/download.php?id=1854&format=gabc&elem=1',
  },
  {
    text: 'Qui me confessus fuerit',
    href: 'https://gregobase.selapa.net/download.php?id=11732&format=gabc&elem=1',
  },
  {
    text: 'Iste Sanctus pro lege',
    href: 'https://gregobase.selapa.net/download.php?id=11741&format=gabc',
  },
  {
    text: 'Iste Sanctus pro lege',
    href: 'https://gregobase.selapa.net/download.php?id=11743&format=gabc',
  },
  {
    text: 'Qui sequitur me',
    href: 'https://gregobase.selapa.net/download.php?id=12251&format=gabc&elem=1',
  },
  {
    text: 'Qui sequitur me',
    href: 'https://gregobase.selapa.net/download.php?id=12690&format=gabc&elem=1',
  },
  {
    text: 'Qui mihi ministrat',
    href: 'https://gregobase.selapa.net/download.php?id=2805&format=gabc&elem=1',
  },
  {
    text: 'Si quis mihi ministraverit',
    href: 'https://gregobase.selapa.net/download.php?id=2466&format=gabc&elem=1',
  },
  {
    text: 'Si quis mihi ministraverit',
    href: 'https://gregobase.selapa.net/download.php?id=11973&format=gabc&elem=1',
  },
  {
    text: 'Volo Pater',
    href: 'https://gregobase.selapa.net/download.php?id=2671&format=gabc&elem=1',
  },
  {
    text: 'Invicte Martyr unicum',
    href: 'https://gregobase.selapa.net/download.php?id=12434&format=gabc',
  },
  {
    text: 'Qui mihi ministrat',
    href: 'https://gregobase.selapa.net/download.php?id=12578&format=gabc&elem=1',
  },
  {
    text: 'Volo Pater ut ubi ego',
    href: 'https://gregobase.selapa.net/download.php?id=13232&format=gabc',
  },
  {
    text: 'Invicte Martyr unicum (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=12034&format=gabc',
  },
  {
    text: 'Qui odit animam suam',
    href: 'https://gregobase.selapa.net/download.php?id=12071&format=gabc&elem=1',
  },
  {
    text: 'Qui odit animam suam',
    href: 'https://gregobase.selapa.net/download.php?id=12296&format=gabc&elem=1',
  },
  {
    text: 'Qui odit animam suam',
    href: 'https://gregobase.selapa.net/download.php?id=2855&format=gabc&elem=1',
  },
  {
    text: 'Magna est gloria ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12441&format=gabc',
  },
  {
    text: 'Gloria et honore',
    href: 'https://gregobase.selapa.net/download.php?id=12552&format=gabc&elem=1',
  },
  {
    text: 'Magna est gloria ejus',
    href: 'https://gregobase.selapa.net/download.php?id=12994&format=gabc',
  },
  {
    text: 'Posuisti Domine',
    href: 'https://gregobase.selapa.net/download.php?id=13337&format=gabc&elem=1',
  },
  {
    text: 'Gloria et honore',
    href: 'https://gregobase.selapa.net/download.php?id=3108&format=gabc&elem=1',
  },
  {
    text: 'Posuisti Domine',
    href: 'https://gregobase.selapa.net/download.php?id=3097&format=gabc&elem=1',
  },
  {
    text: 'Qui vult venire post me',
    href: 'https://gregobase.selapa.net/download.php?id=12048&format=gabc',
  },
  {
    text: 'Qui vult venire post me',
    href: 'https://gregobase.selapa.net/download.php?id=12331&format=gabc',
  },
  {
    text: 'Qui vult venire',
    href: 'https://gregobase.selapa.net/download.php?id=2879&format=gabc&elem=1',
  },
  {
    text: 'Tristes erant Apostoli',
    href: 'https://gregobase.selapa.net/download.php?id=12675&format=gabc&elem=1',
  },
  {
    text: 'Tristes erant Apostoli',
    href: 'https://gregobase.selapa.net/download.php?id=2295&format=gabc&elem=1',
  },
  {
    text: 'Deus tuorum militum (Tempore Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=12833&format=gabc',
  },
  {
    text: 'Deus tuorum militum (Alter tonus T. P.)',
    href: 'https://gregobase.selapa.net/download.php?id=12553&format=gabc',
  },
  {
    text: 'Rex gloriose Martyrum (Tempore Paschali)',
    href: 'https://gregobase.selapa.net/download.php?id=13113&format=gabc',
  },
  {
    text: 'Rex gloriose Martyrum (Alter tonus T. P.)',
    href: 'https://gregobase.selapa.net/download.php?id=12168&format=gabc',
  },
  {
    text: 'Lux perpetua lucebit',
    href: 'https://gregobase.selapa.net/download.php?id=12701&format=gabc',
  },
  {
    text: 'Lux perpetua lucebit',
    href: 'https://gregobase.selapa.net/download.php?id=13210&format=gabc',
  },
  {
    text: 'Lux perpetua',
    href: 'https://gregobase.selapa.net/download.php?id=2510&format=gabc&elem=1',
  },
  {
    text: 'Spiritus et animae',
    href: 'https://gregobase.selapa.net/download.php?id=11915&format=gabc&elem=1',
  },
  {
    text: 'Sancti tui Domine',
    href: 'https://gregobase.selapa.net/download.php?id=12556&format=gabc&elem=1',
  },
  {
    text: 'In velamento clamabant',
    href: 'https://gregobase.selapa.net/download.php?id=12753&format=gabc&elem=1',
  },
  {
    text: 'In caelestibus regnis ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=12987&format=gabc',
  },
  {
    text: 'Sancti tui Domine',
    href: 'https://gregobase.selapa.net/download.php?id=1923&format=gabc&elem=1',
  },
  {
    text: 'In caelestibus regnis... alleluia',
    href: 'https://gregobase.selapa.net/download.php?id=2105&format=gabc',
  },
  {
    text: 'In velamento clamabant',
    href: 'https://gregobase.selapa.net/download.php?id=2788&format=gabc&elem=1',
  },
  {
    text: 'Spiritus et animae',
    href: 'https://gregobase.selapa.net/download.php?id=2943&format=gabc&elem=1',
  },
  {
    text: 'Paschale mundo gaudium',
    href: 'https://gregobase.selapa.net/download.php?id=11809&format=gabc',
  },
  {
    text: 'Fulgebunt justi sicut sol',
    href: 'https://gregobase.selapa.net/download.php?id=2720&format=gabc&elem=1',
  },
  {
    text: 'Fulgebunt justi sicut sol',
    href: 'https://gregobase.selapa.net/download.php?id=12878&format=gabc&elem=1',
  },
  {
    text: 'Invicte Martyr unicum (Temp. Pasch.)',
    href: 'https://gregobase.selapa.net/download.php?id=12997&format=gabc',
  },
  {
    text: 'Invicte Martyr unicum (Alter tonus T. P.)',
    href: 'https://gregobase.selapa.net/download.php?id=13216&format=gabc',
  },
  {
    text: 'Filiae Jerusalem venite',
    href: 'https://gregobase.selapa.net/download.php?id=11765&format=gabc&elem=1',
  },
  {
    text: 'Filiae Jerusalem venite',
    href: 'https://gregobase.selapa.net/download.php?id=12236&format=gabc&elem=1',
  },
  {
    text: 'Sancti et justi in Domino',
    href: 'https://gregobase.selapa.net/download.php?id=12973&format=gabc',
  },
  {
    text: 'Sancti et justi',
    href: 'https://gregobase.selapa.net/download.php?id=3066&format=gabc&elem=1',
  },
  {
    text: 'Laetitia sempiterna',
    href: 'https://gregobase.selapa.net/download.php?id=12151&format=gabc&elem=1',
  },
  {
    text: 'Lux perpetua lucebit',
    href: 'https://gregobase.selapa.net/download.php?id=13203&format=gabc',
  },
  {
    text: 'Laetitia sempiterna',
    href: 'https://gregobase.selapa.net/download.php?id=3198&format=gabc&elem=1',
  },
  {
    text: 'Sancti et justi in Domino',
    href: 'https://gregobase.selapa.net/download.php?id=11902&format=gabc',
  },
  {
    text: 'Sancti et justi in Domino',
    href: 'https://gregobase.selapa.net/download.php?id=11995&format=gabc',
  },
  {
    text: 'Sanctorum meritis inclyta',
    href: 'https://gregobase.selapa.net/download.php?id=12412&format=gabc',
  },
  {
    text: 'Sancti et justi',
    href: 'https://gregobase.selapa.net/download.php?id=2831&format=gabc&elem=1',
  },
  {
    text: 'Sanctorum meritis',
    href: 'https://gregobase.selapa.net/download.php?id=2571&format=gabc&elem=1',
  },
  {
    text: 'Sanctorum meritis inclyta (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=12262&format=gabc',
  },
  {
    text: 'Istorum est enim regnum',
    href: 'https://gregobase.selapa.net/download.php?id=12463&format=gabc',
  },
  {
    text: 'Istorum est enim regnum',
    href: 'https://gregobase.selapa.net/download.php?id=13332&format=gabc',
  },
  {
    text: 'Istorum est enim',
    href: 'https://gregobase.selapa.net/download.php?id=2682&format=gabc&elem=1',
  },
  {
    text: 'Cum palma ad regna',
    href: 'https://gregobase.selapa.net/download.php?id=12982&format=gabc&elem=1',
  },
  {
    text: 'Corpora Sanctorum in pace',
    href: 'https://gregobase.selapa.net/download.php?id=13308&format=gabc',
  },
  {
    text: 'Omnes sancti',
    href: 'https://gregobase.selapa.net/download.php?id=1821&format=gabc&elem=1',
  },
  {
    text: 'Omnes Sancti quanta passi',
    href: 'https://gregobase.selapa.net/download.php?id=12500&format=gabc&elem=1',
  },
  {
    text: 'Cum palma ad regna',
    href: 'https://gregobase.selapa.net/download.php?id=2338&format=gabc&elem=1',
  },
  {
    text: 'Corpora sanctorum',
    href: 'https://gregobase.selapa.net/download.php?id=2746&format=gabc&elem=1',
  },
  {
    text: 'Martyrum chorus laudate',
    href: 'https://gregobase.selapa.net/download.php?id=12903&format=gabc',
  },
  {
    text: 'Martyres Domini',
    href: 'https://gregobase.selapa.net/download.php?id=13045&format=gabc&elem=1',
  },
  {
    text: 'Rex gloriose Martyrum',
    href: 'https://gregobase.selapa.net/download.php?id=13056&format=gabc&elem=1',
  },
  {
    text: 'Martyres Domini',
    href: 'https://gregobase.selapa.net/download.php?id=2051&format=gabc&elem=1',
  },
  {
    text: 'Martyrum chorus',
    href: 'https://gregobase.selapa.net/download.php?id=1897&format=gabc&elem=1',
  },
  {
    text: 'Rex gloriose Martyrum',
    href: 'https://gregobase.selapa.net/download.php?id=2790&format=gabc&elem=1',
  },
  {
    text: 'Rex gloriose Martyrum (Alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=13133&format=gabc',
  },
  {
    text: 'Rex gloriose Martyrum (another download)',
    href: 'https://gregobase.selapa.net/download.php?id=2662&format=gabc&elem=1',
  },
  {
    text: 'Vestri capilli capitis',
    href: 'https://gregobase.selapa.net/download.php?id=12212&format=gabc&elem=1',
  },
  {
    text: 'Vestri capilli capitis',
    href: 'https://gregobase.selapa.net/download.php?id=12836&format=gabc&elem=1',
  },
  {
    text: 'Vestri capilli capitis',
    href: 'https://gregobase.selapa.net/download.php?id=2177&format=gabc&elem=1',
  },
  {
    text: 'Laetamini in Domino',
    href: 'https://gregobase.selapa.net/download.php?id=12727&format=gabc&elem=1',
  },
  {
    text: 'Laetamini in Domino',
    href: 'https://gregobase.selapa.net/download.php?id=3218&format=gabc&elem=1',
  },
  {
    text: 'Exsultent justi',
    href: 'https://gregobase.selapa.net/download.php?id=3160&format=gabc&elem=1',
  },
  {
    text: 'Justi autem',
    href: 'https://gregobase.selapa.net/download.php?id=3199&format=gabc&elem=1',
  },
  {
    text: 'Isti sunt sancti',
    href: 'https://gregobase.selapa.net/download.php?id=2186&format=gabc&elem=1',
  },
  {
    text: 'Sancti per fidem',
    href: 'https://gregobase.selapa.net/download.php?id=2482&format=gabc&elem=1',
  },
  {
    text: 'Sanctorum velut aquilae',
    href: 'https://gregobase.selapa.net/download.php?id=2198&format=gabc&elem=1',
  },
  {
    text: 'Absterget Deus',
    href: 'https://gregobase.selapa.net/download.php?id=2665&format=gabc&elem=1',
  },
  {
    text: 'In caelestibus regnis',
    href: 'https://gregobase.selapa.net/download.php?id=1886&format=gabc&elem=1',
  },
  {
    text: 'Gaudent in caelis',
    href: 'https://gregobase.selapa.net/download.php?id=1958&format=gabc&elem=1',
  },
  {
    text: 'Iste Confessor (Conf. Bishop) 2',
    href: 'https://gregobase.selapa.net/download.php?id=18952&format=gabc&elem=1',
  },
  {
    text: 'Iste Confessor (Conf. Bishop) 4',
    href: 'https://gregobase.selapa.net/download.php?id=18948&format=gabc',
  },
  {
    text: 'Iste Confessor (Conf. Bishop) 3',
    href: 'https://gregobase.selapa.net/download.php?id=18953&format=gabc',
  },
  {
    text: 'Sacerdos et Pontifex',
    href: 'https://gregobase.selapa.net/download.php?id=12496&format=gabc',
  },
  {
    text: 'Sacerdos et Pontifex... ora',
    href: 'https://gregobase.selapa.net/download.php?id=2223&format=gabc&elem=1',
  },
  {
    text: 'Dilexit justitiam (alt)',
    href: 'https://gregobase.selapa.net/download.php?id=18846&format=gabc&elem=1',
  },
  {
    text: 'Ecce sacerdos magnus',
    href: 'https://gregobase.selapa.net/download.php?id=1914&format=gabc&elem=1',
  },
  {
    text: 'Non est inventus',
    href: 'https://gregobase.selapa.net/download.php?id=2613&format=gabc&elem=1',
  },
  {
    text: 'Ideo jurejurando',
    href: 'https://gregobase.selapa.net/download.php?id=2858&format=gabc&elem=1',
  },
  {
    text: 'Sacerdotes Dei',
    href: 'https://gregobase.selapa.net/download.php?id=2009&format=gabc&elem=1',
  },
  {
    text: 'Serve bone et fidelis intra (Conf. Pontificis)',
    href: 'https://gregobase.selapa.net/download.php?id=2592&format=gabc&elem=1',
  },
  {
    text: 'Jesu Redemptor omnium (Com. Con. Pont.)',
    href: 'https://gregobase.selapa.net/download.php?id=17925&format=gabc',
  },
  {
    text: 'Euge serve (Conf. Pont.)',
    href: 'https://gregobase.selapa.net/download.php?id=11839&format=gabc',
  },
  {
    text: 'Euge serve bone (Conf. Pont.)',
    href: 'https://gregobase.selapa.net/download.php?id=2306&format=gabc&elem=1',
  },
  {
    text: 'Amavit eum Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=3089&format=gabc&elem=1',
  },
  {
    text: 'Amavit eum Dominus (Resp. Br. T.P.)',
    href: 'https://gregobase.selapa.net/download.php?id=3072&format=gabc&elem=1',
  },
  {
    text: 'Elegit eum',
    href: 'https://gregobase.selapa.net/download.php?id=3222&format=gabc&elem=1',
  },
  {
    text: 'Elegit eum (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3141&format=gabc&elem=1',
  },
  {
    text: 'Tu es sacerdos',
    href: 'https://gregobase.selapa.net/download.php?id=3101&format=gabc&elem=1',
  },
  {
    text: 'Tu es sacerdos (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3146&format=gabc&elem=1',
  },
  {
    text: 'Amavit eum Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12384&format=gabc&elem=1',
  },
  {
    text: 'Amavit eum Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2933&format=gabc&elem=1',
  },
  {
    text: 'Dum esset summus pontifex',
    href: 'https://gregobase.selapa.net/download.php?id=1820&format=gabc&elem=1',
  },
  {
    text: 'O Doctor optime',
    href: 'https://gregobase.selapa.net/download.php?id=1908&format=gabc&elem=1',
  },
  {
    text: 'Dum esset summus',
    href: 'https://gregobase.selapa.net/download.php?id=11787&format=gabc&elem=1',
  },
  {
    text: 'Iste Confessor (Conf. not Bishop) 6',
    href: 'https://gregobase.selapa.net/download.php?id=18949&format=gabc',
  },
  {
    text: 'Iste Confessor (Conf. not Bishop) 8',
    href: 'https://gregobase.selapa.net/download.php?id=18947&format=gabc',
  },
  {
    text: 'Similabo eum',
    href: 'https://gregobase.selapa.net/download.php?id=2586&format=gabc&elem=1',
  },
  {
    text: 'Domine quinque talenta',
    href: 'https://gregobase.selapa.net/download.php?id=2080&format=gabc&elem=1',
  },
  {
    text: 'Euge serve bone in modico',
    href: 'https://gregobase.selapa.net/download.php?id=2179&format=gabc&elem=1',
  },
  {
    text: 'Fidelis servus et prudens (Ant.)',
    href: 'https://gregobase.selapa.net/download.php?id=2570&format=gabc&elem=1',
  },
  {
    text: 'Beatus ille servus',
    href: 'https://gregobase.selapa.net/download.php?id=2182&format=gabc&elem=1',
  },
  {
    text: 'Serve bone et fidelis intra (Conf. non Pontificis)',
    href: 'https://gregobase.selapa.net/download.php?id=2677&format=gabc&elem=1',
  },
  {
    text: 'Jesu Corona celsior (Conf. non Pont.)',
    href: 'https://gregobase.selapa.net/download.php?id=17926&format=gabc',
  },
  {
    text: 'Euge serve (Non Pont.)',
    href: 'https://gregobase.selapa.net/download.php?id=11834&format=gabc',
  },
  {
    text: 'Euge serve bone (Conf. non Pont.)',
    href: 'https://gregobase.selapa.net/download.php?id=2808&format=gabc&elem=1',
  },
  {
    text: 'Amavit eum Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=3089&format=gabc&elem=1',
  },
  {
    text: 'Os justi',
    href: 'https://gregobase.selapa.net/download.php?id=3084&format=gabc&elem=1',
  },
  {
    text: 'Os justi (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3052&format=gabc&elem=1',
  },
  {
    text: 'Hic vir despiciens',
    href: 'https://gregobase.selapa.net/download.php?id=12068&format=gabc&elem=1',
  },
  {
    text: 'Lex Dei',
    href: 'https://gregobase.selapa.net/download.php?id=3110&format=gabc&elem=1',
  },
  {
    text: 'Lex Dei (Tempus Paschale)',
    href: 'https://gregobase.selapa.net/download.php?id=3180&format=gabc&elem=1',
  },
  {
    text: 'Hic vir despiciens',
    href: 'https://gregobase.selapa.net/download.php?id=2251&format=gabc&elem=1',
  },
  {
    text: 'Veni sponsa Christi (I Vesperis)',
    href: 'https://gregobase.selapa.net/download.php?id=2745&format=gabc&elem=1',
  },
  {
    text: 'Prudentes Virgines',
    href: 'https://gregobase.selapa.net/download.php?id=12550&format=gabc',
  },
  {
    text: 'Prudentes virgines',
    href: 'https://gregobase.selapa.net/download.php?id=2919&format=gabc&elem=1',
  },
  {
    text: 'Haec est virgo sapiens et una',
    href: 'https://gregobase.selapa.net/download.php?id=2281&format=gabc&elem=1',
  },
  {
    text: 'Haec est virgo sapiens quam',
    href: 'https://gregobase.selapa.net/download.php?id=2798&format=gabc&elem=1',
  },
  {
    text: 'Haec est quae nescivit',
    href: 'https://gregobase.selapa.net/download.php?id=2836&format=gabc&elem=1',
  },
  {
    text: 'Veni electa mea',
    href: 'https://gregobase.selapa.net/download.php?id=2115&format=gabc&elem=1',
  },
  {
    text: 'Ista est speciosa (Virginum)',
    href: 'https://gregobase.selapa.net/download.php?id=2151&format=gabc&elem=1',
  },
  {
    text: 'Jesu corona virginum',
    href: 'https://gregobase.selapa.net/download.php?id=2587&format=gabc&elem=1',
  },
  {
    text: 'Jesu corona Virginum (Alter Tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=18189&format=gabc',
  },
  {
    text: 'Jesu Corona Virginum alter tonus',
    href: 'https://gregobase.selapa.net/download.php?id=19359&format=gabc',
  },
  {
    text: 'Simile est ... homini negotiatori',
    href: 'https://gregobase.selapa.net/download.php?id=12921&format=gabc',
  },
  {
    text: 'Simile est... negotiatori',
    href: 'https://gregobase.selapa.net/download.php?id=2777&format=gabc&elem=1',
  },
  {
    text: 'Specie tua',
    href: 'https://gregobase.selapa.net/download.php?id=3208&format=gabc&elem=1',
  },
  {
    text: 'Specie tua (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3147&format=gabc&elem=1',
  },
  {
    text: 'Adjuvabit eam',
    href: 'https://gregobase.selapa.net/download.php?id=8710&format=gabc&elem=1',
  },
  {
    text: 'Adjuvabit eam (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3049&format=gabc&elem=1',
  },
  {
    text: 'Elegit eam',
    href: 'https://gregobase.selapa.net/download.php?id=3143&format=gabc&elem=1',
  },
  {
    text: 'Veni sponsa Christi (II Vesperis)',
    href: 'https://gregobase.selapa.net/download.php?id=2042&format=gabc&elem=1',
  },
  {
    text: 'Simile est ... homini negotiatori',
    href: 'https://gregobase.selapa.net/download.php?id=12921&format=gabc',
  },
  {
    text: 'Simile est... negotiatori',
    href: 'https://gregobase.selapa.net/download.php?id=2777&format=gabc&elem=1',
  },
  {
    text: 'Dum esset rex',
    href: 'https://gregobase.selapa.net/download.php?id=2000&format=gabc&elem=1',
  },
  {
    text: 'In odorem unguentorum',
    href: 'https://gregobase.selapa.net/download.php?id=12490&format=gabc',
  },
  {
    text: 'Jam hiems transiit',
    href: 'https://gregobase.selapa.net/download.php?id=2056&format=gabc&elem=1',
  },
  {
    text: 'Veni electa mea',
    href: 'https://gregobase.selapa.net/download.php?id=2115&format=gabc&elem=1',
  },
  {
    text: 'Ista est speciosa (S. Mulierum)',
    href: 'https://gregobase.selapa.net/download.php?id=2474&format=gabc&elem=1',
  },
  {
    text: 'Fortem virili pectore',
    href: 'https://gregobase.selapa.net/download.php?id=2492&format=gabc&elem=1',
  },
  {
    text: 'Fortem virili pectore (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=2024&format=gabc&elem=1',
  },
  {
    text: 'Date ei de fructu',
    href: 'https://gregobase.selapa.net/download.php?id=13275&format=gabc&elem=1',
  },
  {
    text: 'Date ei de fructu',
    href: 'https://gregobase.selapa.net/download.php?id=2681&format=gabc&elem=1',
  },
  {
    text: 'Manum suam aperuit',
    href: 'https://gregobase.selapa.net/download.php?id=11979&format=gabc',
  },
  {
    text: 'Manum suam',
    href: 'https://gregobase.selapa.net/download.php?id=2275&format=gabc&elem=1',
  },
  {
    text: 'Sanctificavit Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=2315&format=gabc&elem=1',
  },
  {
    text: 'Domum tuam Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2758&format=gabc&elem=1',
  },
  {
    text: 'Domus mea',
    href: 'https://gregobase.selapa.net/download.php?id=2508&format=gabc&elem=1',
  },
  {
    text: 'Haec est domus Domini',
    href: 'https://gregobase.selapa.net/download.php?id=2834&format=gabc&elem=1',
  },
  {
    text: 'Bene fundata est',
    href: 'https://gregobase.selapa.net/download.php?id=2869&format=gabc&elem=1',
  },
  {
    text: 'Lapides pretiosi',
    href: 'https://gregobase.selapa.net/download.php?id=2776&format=gabc&elem=1',
  },
  {
    text: 'Zachaee festinans',
    href: 'https://gregobase.selapa.net/download.php?id=2526&format=gabc&elem=1',
  },
  {
    text: 'Domum tuam',
    href: 'https://gregobase.selapa.net/download.php?id=3121&format=gabc&elem=1',
  },
  {
    text: 'Domum tuam (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3131&format=gabc&elem=1',
  },
  {
    text: 'Locus iste',
    href: 'https://gregobase.selapa.net/download.php?id=1065&format=gabc&elem=1',
  },
  {
    text: 'Locus iste (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3071&format=gabc&elem=1',
  },
  {
    text: 'Haec est domus Domini',
    href: 'https://gregobase.selapa.net/download.php?id=3188&format=gabc&elem=1',
  },
  {
    text: 'Haec est domus (Paschal Time)',
    href: 'https://gregobase.selapa.net/download.php?id=3182&format=gabc&elem=1',
  },
  {
    text: 'Dum esset rex',
    href: 'https://gregobase.selapa.net/download.php?id=2000&format=gabc&elem=1',
  },
  {
    text: 'Nigra sum sed formosa',
    href: 'https://gregobase.selapa.net/download.php?id=2007&format=gabc&elem=1',
  },
  {
    text: 'Jam hiems transiit',
    href: 'https://gregobase.selapa.net/download.php?id=2056&format=gabc&elem=1',
  },
  {
    text: 'Speciosa facta es (Ant)',
    href: 'https://gregobase.selapa.net/download.php?id=18381&format=gabc',
  },
  {
    text: 'Ave maris stella (in sollemnitatis)',
    href: 'https://gregobase.selapa.net/download.php?id=2232&format=gabc&elem=1',
  },
  {
    text: 'Ave maris stella (another download)',
    href: 'https://gregobase.selapa.net/download.php?id=2563&format=gabc&elem=1',
  },
  {
    text: 'Ave maris stella (another download) (2)',
    href: 'https://gregobase.selapa.net/download.php?id=1900&format=gabc&elem=1',
  },
  {
    text: 'Sancta Maria succurre',
    href: 'https://gregobase.selapa.net/download.php?id=12669&format=gabc',
  },
  {
    text: 'O gloriosa virginum',
    href: 'https://gregobase.selapa.net/download.php?id=2885&format=gabc&elem=1',
  },
  {
    text: 'Beata es Maria',
    href: 'https://gregobase.selapa.net/download.php?id=13018&format=gabc',
  },
  {
    text: 'Beata es Maria',
    href: 'https://gregobase.selapa.net/download.php?id=13037&format=gabc',
  },
  {
    text: 'Nunc Sancte nobis (In Festis BMV)',
    href: 'https://gregobase.selapa.net/download.php?id=2964&format=gabc&elem=1',
  },
  {
    text: 'Beatam me dicent omnes',
    href: 'https://gregobase.selapa.net/download.php?id=12818&format=gabc',
  },
  {
    text: 'Ave Maris Stella (Off. BMV in Sab.)',
    href: 'https://gregobase.selapa.net/download.php?id=14959&format=gabc',
  },
  {
    text: 'Ave Maris Stella (Off. BMV in Sab. Alt.)',
    href: 'https://gregobase.selapa.net/download.php?id=14960&format=gabc',
  },
  {
    text: 'Sancti omnes intercedant',
    href: 'https://gregobase.selapa.net/download.php?id=12218&format=gabc',
  },
  {
    text: 'Beata Mater (in Sabbato)',
    href: 'https://gregobase.selapa.net/download.php?id=18110&format=gabc',
  },
  {
    text: 'Beata Dei Genitrix',
    href: 'https://gregobase.selapa.net/download.php?id=19326&format=gabc',
  },
  {
    text: 'Regina caeli (Off. BMV in Sab. T.P.)',
    href: 'https://gregobase.selapa.net/download.php?id=14963&format=gabc',
  },
  {
    text: 'Sancti Dei Omnes',
    href: 'https://gregobase.selapa.net/download.php?id=14253&format=gabc',
  },
  {
    text: 'Memento rerum conditor',
    href: 'https://gregobase.selapa.net/download.php?id=18845&format=gabc',
  },
  {
    text: 'Sub tuum praesidium',
    href: 'https://gregobase.selapa.net/download.php?id=18315&format=gabc',
  },
  {
    text: 'Spiritus Sanctus ... ne timeas',
    href: 'https://gregobase.selapa.net/download.php?id=12304&format=gabc',
  },
  {
    text: 'Spiritus sanctus (Off. Parvum BMV)',
    href: 'https://gregobase.selapa.net/download.php?id=14964&format=gabc',
  },
  {
    text: 'Ecce Dominus veniet',
    href: 'https://gregobase.selapa.net/download.php?id=11773&format=gabc&elem=1',
  },
  {
    text: 'Missus est Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=11827&format=gabc&elem=1',
  },
  {
    text: 'Missus est Gabriel',
    href: 'https://gregobase.selapa.net/download.php?id=11848&format=gabc&elem=1',
  },
  {
    text: 'Ne timeas Maria ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=11899&format=gabc',
  },
  {
    text: 'Ave Maria ... allel.',
    href: 'https://gregobase.selapa.net/download.php?id=12998&format=gabc',
  },
  {
    text: 'Dabit ei Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=12501&format=gabc&elem=1',
  },
  {
    text: 'Ecce ancilla Domini',
    href: 'https://gregobase.selapa.net/download.php?id=12613&format=gabc&elem=1',
  },
  {
    text: 'Ecce ancilla Domini',
    href: 'https://gregobase.selapa.net/download.php?id=13295&format=gabc&elem=1',
  },
  {
    text: 'Placebo Domino',
    href: 'https://gregobase.selapa.net/download.php?id=1875&format=gabc&elem=1',
  },
  {
    text: 'Heu me',
    href: 'https://gregobase.selapa.net/download.php?id=2113&format=gabc&elem=1',
  },
  {
    text: 'Dominus custodit te',
    href: 'https://gregobase.selapa.net/download.php?id=1867&format=gabc&elem=1',
  },
  {
    text: 'Si iniquitates (Ant)',
    href: 'https://gregobase.selapa.net/download.php?id=2672&format=gabc&elem=1',
  },
  {
    text: 'Opera manuum tuarum',
    href: 'https://gregobase.selapa.net/download.php?id=2898&format=gabc&elem=1',
  },
  {
    text: 'Omne quod dat mihi',
    href: 'https://gregobase.selapa.net/download.php?id=2188&format=gabc&elem=1',
  },
  {
    text: 'Dirige Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2605&format=gabc&elem=1',
  },
  {
    text: 'Convertere',
    href: 'https://gregobase.selapa.net/download.php?id=2189&format=gabc&elem=1',
  },
  {
    text: 'Nequando',
    href: 'https://gregobase.selapa.net/download.php?id=2531&format=gabc&elem=1',
  },
  {
    text: 'In loco pascuae',
    href: 'https://gregobase.selapa.net/download.php?id=13146&format=gabc',
  },
  {
    text: 'In loco pascuae ibi me',
    href: 'https://gregobase.selapa.net/download.php?id=2938&format=gabc&elem=1',
  },
  {
    text: 'Delicta',
    href: 'https://gregobase.selapa.net/download.php?id=2442&format=gabc&elem=1',
  },
  {
    text: 'Credo videre (Holy Saturday)',
    href: 'https://gregobase.selapa.net/download.php?id=1870&format=gabc&elem=1',
  },
  {
    text: 'Credo videre (Office of the Dead)',
    href: 'https://gregobase.selapa.net/download.php?id=1925&format=gabc&elem=1',
  },
  {
    text: 'Complaceat',
    href: 'https://gregobase.selapa.net/download.php?id=2241&format=gabc&elem=1',
  },
  {
    text: 'Sana Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2967&format=gabc&elem=1',
  },
  {
    text: 'Sitivit anima mea',
    href: 'https://gregobase.selapa.net/download.php?id=12722&format=gabc',
  },
  {
    text: 'Exsultabunt Domino',
    href: 'https://gregobase.selapa.net/download.php?id=1068&format=gabc&elem=1',
  },
  {
    text: 'Exaudi Domine',
    href: 'https://gregobase.selapa.net/download.php?id=2821&format=gabc&elem=1',
  },
  {
    text: 'Me suscepit',
    href: 'https://gregobase.selapa.net/download.php?id=12796&format=gabc&elem=1',
  },
  {
    text: 'Me suscepit',
    href: 'https://gregobase.selapa.net/download.php?id=1899&format=gabc&elem=1',
  },
  {
    text: 'A porta inferi',
    href: 'https://gregobase.selapa.net/download.php?id=12668&format=gabc&elem=1',
  },
  {
    text: 'A porta inferi',
    href: 'https://gregobase.selapa.net/download.php?id=2253&format=gabc&elem=1',
  },
  {
    text: 'Omnis spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=2467&format=gabc&elem=1',
  },
  {
    text: 'Ego sum resurrectio',
    href: 'https://gregobase.selapa.net/download.php?id=935&format=gabc&elem=1',
  },
  {
    text: 'Ego sum resurrectio',
    href: 'https://gregobase.selapa.net/download.php?id=935&format=gabc&elem=1',
  },
  {
    text: 'Deus in adjutorium (Tonus ferialis)',
    href: 'https://gregobase.selapa.net/download.php?id=15354&format=gabc&elem=1',
  },
  {
    text: 'Kyrie eleison (tonus simplex)',
    href: 'https://gregobase.selapa.net/download.php?id=16701&format=gabc',
  },
  {
    text: 'Benedicamus Domino (I classis in I Vesperis)',
    href: 'https://gregobase.selapa.net/download.php?id=4567&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Domino (I classis ad Laudes)',
    href: 'https://gregobase.selapa.net/download.php?id=612&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Domino (I classis in II Vesperis)',
    href: 'https://gregobase.selapa.net/download.php?id=4568&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Domino (I classis in II Vesperis mode 5)',
    href: 'https://gregobase.selapa.net/download.php?id=7522&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Domino (Festis II classis ad Laudes)',
    href: 'https://gregobase.selapa.net/download.php?id=15740&format=gabc',
  },
  {
    text: 'Benedicamus Domino (II classis ad I. Vesperas)',
    href: 'https://gregobase.selapa.net/download.php?id=7866&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Domino (II Classis ad Laudes)',
    href: 'https://gregobase.selapa.net/download.php?id=10336&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Domino (II classis in II vesperis)',
    href: 'https://gregobase.selapa.net/download.php?id=8245&format=gabc',
  },
  {
    text: 'Benedicamus Domino (III classis ad Laudes)',
    href: 'https://gregobase.selapa.net/download.php?id=10172&format=gabc',
  },
  {
    text: 'Benedicamus Domino (III classis ad vesperas)',
    href: 'https://gregobase.selapa.net/download.php?id=15698&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Domino (On Feasts of the BVM)',
    href: 'https://gregobase.selapa.net/download.php?id=10399&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Domino (On Sunday during the year)',
    href: 'https://gregobase.selapa.net/download.php?id=8120&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Domino (Festis Simplicibus)',
    href: 'https://gregobase.selapa.net/download.php?id=15743&format=gabc',
  },
  {
    text: 'Benedicamus Domino (In Officium BMV in Sabbato)',
    href: 'https://gregobase.selapa.net/download.php?id=17674&format=gabc',
  },
  {
    text: 'Benedicamus Domino (In Feriis)',
    href: 'https://gregobase.selapa.net/download.php?id=15741&format=gabc&elem=1',
  },
  {
    text: 'Benedicamus Domino (Sundays of Advent And Lent)',
    href: 'https://gregobase.selapa.net/download.php?id=9841&format=gabc&elem=1',
  },
  {
    text: 'Veni Sancte Spiritus reple',
    href: 'https://gregobase.selapa.net/download.php?id=2813&format=gabc&elem=1',
  },
  {
    text: 'Veni Creator Spiritus',
    href: 'https://gregobase.selapa.net/download.php?id=13353&format=gabc&elem=1',
  },
  {
    text: 'Sacerdos et Pontifex',
    href: 'https://gregobase.selapa.net/download.php?id=12496&format=gabc',
  },
  {
    text: 'Adoremus in aeternum',
    href: 'https://gregobase.selapa.net/download.php?id=3017&format=gabc&elem=1',
  },
  {
    text: 'Ave verum',
    href: 'https://gregobase.selapa.net/download.php?id=2441&format=gabc&elem=1',
  },
  {
    text: 'Ave verum',
    href: 'https://gregobase.selapa.net/download.php?id=17777&format=gabc&elem=1',
  },
  {
    text: 'Adoro te devote',
    href: 'https://gregobase.selapa.net/download.php?id=3020&format=gabc&elem=1',
  },
  {
    text: 'Pange lingua... Corporis (alter tonus)',
    href: 'https://gregobase.selapa.net/download.php?id=2888&format=gabc&elem=1',
  },
  {
    text: 'Salve Mater',
    href: 'https://gregobase.selapa.net/download.php?id=3013&format=gabc&elem=1',
  },
  {
    text: 'Attende Domine',
    href: 'https://gregobase.selapa.net/download.php?id=3021&format=gabc&elem=1',
  },
  {
    text: 'Salve festa dies',
    href: 'https://gregobase.selapa.net/download.php?id=8241&format=gabc&elem=1',
  },
  {
    text: 'Qui procedis',
    href: 'https://gregobase.selapa.net/download.php?id=18751&format=gabc&elem=1',
  },
  {
    text: 'Alleluia Omnes Gentes',
    href: 'https://gregobase.selapa.net/download.php?id=17693&format=gabc',
  },
  {
    text: 'Simile est regnum caelorum',
    href: 'https://gregobase.selapa.net/download.php?id=18848&format=gabc',
  },
  {
    text: 'Absque tuo imperio',
    href: 'https://gregobase.selapa.net/download.php?id=19363&format=gabc',
  },
  {
    text: 'Solemnitas est hodie sancti Joseph',
    href: 'https://gregobase.selapa.net/download.php?id=10169&format=gabc',
  },
  {
    text: 'Christus Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=1941&format=gabc&elem=1',
  },
  {
    text: 'Deus mundi opifex',
    href: 'https://gregobase.selapa.net/download.php?id=2158&format=gabc&elem=1',
  },
  {
    text: 'Christus Dei Filius',
    href: 'https://gregobase.selapa.net/download.php?id=2243&format=gabc&elem=1',
  },
  {
    text: 'Artem fabri',
    href: 'https://gregobase.selapa.net/download.php?id=2127&format=gabc&elem=1',
  },
  {
    text: 'Fidelis servus et prudens (Ant.)',
    href: 'https://gregobase.selapa.net/download.php?id=19272&format=gabc&elem=1',
  },
  {
    text: 'Joseph opifex sancte',
    href: 'https://gregobase.selapa.net/download.php?id=2542&format=gabc&elem=1',
  },
  {
    text: 'Aurora solis nuntia',
    href: 'https://gregobase.selapa.net/download.php?id=1986&format=gabc&elem=1',
  },
  {
    text: 'Ora pro nobis sancte Joseph',
    href: 'https://gregobase.selapa.net/download.php?id=18586&format=gabc',
  },
  {
    text: 'Candor lucis aeternae',
    href: 'https://gregobase.selapa.net/download.php?id=20237&format=gabc',
  },
  {
    text: 'Gratias tibi ago Feb 18',
    href: 'https://gregobase.selapa.net/download.php?id=20238&format=gabc',
  },
  {
    text: 'Stat cultrix vigilans',
    href: 'https://gregobase.selapa.net/download.php?id=8219&format=gabc&elem=1',
  },
  {
    text: 'Haec est Joanna',
    href: 'https://gregobase.selapa.net/download.php?id=8220&format=gabc&elem=1',
  },
  {
    text: 'Ecce Joanna',
    href: 'https://gregobase.selapa.net/download.php?id=20227&format=gabc',
  },
  {
    text: 'Suscitavit eam Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=20228&format=gabc',
  },
  {
    text: 'Stetit',
    href: 'https://gregobase.selapa.net/download.php?id=20229&format=gabc',
  },
  {
    text: 'Ecce levavit',
    href: 'https://gregobase.selapa.net/download.php?id=20231&format=gabc',
  },
  {
    text: 'Custodivit eam',
    href: 'https://gregobase.selapa.net/download.php?id=20230&format=gabc',
  },
  {
    text: 'Hostium victrix',
    href: 'https://gregobase.selapa.net/download.php?id=4031&format=gabc&elem=1',
  },
  {
    text: 'Salve virilis pectoris',
    href: 'https://gregobase.selapa.net/download.php?id=20239&format=gabc',
  },
  {
    text: 'Joanna',
    href: 'https://gregobase.selapa.net/download.php?id=20232&format=gabc',
  },
  {
    text: 'Tu honorificentia',
    href: 'https://gregobase.selapa.net/download.php?id=20234&format=gabc',
  },
  {
    text: 'Confirmavit omnes',
    href: 'https://gregobase.selapa.net/download.php?id=20236&format=gabc',
  },
  {
    text: 'Suscitabo mihi',
    href: 'https://gregobase.selapa.net/download.php?id=20225&format=gabc',
  },
  {
    text: 'Multi credentium',
    href: 'https://gregobase.selapa.net/download.php?id=20233&format=gabc',
  },
  {
    text: 'Nomen decusque concinant',
    href: 'https://gregobase.selapa.net/download.php?id=20240&format=gabc',
  },
  {
    text: 'Benedicta tu a Deo',
    href: 'https://gregobase.selapa.net/download.php?id=16227&format=gabc',
  },
  {
    text: 'Ego Dominus',
    href: 'https://gregobase.selapa.net/download.php?id=20224&format=gabc',
  },
  {
    text: 'Dominus elegit te',
    href: 'https://gregobase.selapa.net/download.php?id=16228&format=gabc',
  },
  {
    text: 'Eris corona gloriae',
    href: 'https://gregobase.selapa.net/download.php?id=16229&format=gabc',
  },
  {
    text: 'Dominus faciet et tecum',
    href: 'https://gregobase.selapa.net/download.php?id=16230&format=gabc',
  },
  {
    text: 'Erumpet quasi',
    href: 'https://gregobase.selapa.net/download.php?id=16231&format=gabc',
  },
  {
    text: 'Luce divina',
    href: 'https://gregobase.selapa.net/download.php?id=16225&format=gabc',
  },
  {
    text: 'Benedictus Dominus quia hodie',
    href: 'https://gregobase.selapa.net/download.php?id=16232&format=gabc&elem=1',
  },
  {
    text: 'Iste Confessor (Conf. not Bishop) 7',
    href: 'https://gregobase.selapa.net/download.php?id=18629&format=gabc',
  },
];

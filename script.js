const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// theme
const root=document.documentElement;
$('#th').onclick=()=>{const d=getComputedStyle(root).getPropertyValue('--bg').trim()==='#0a1a38';root.dataset.theme=d?'light':'dark'};
// hero terminal
const lines=[['c','# mon premier programme'],['','<k>def</k> explorer(jeune):'],['','    <k>for</k> etape <k>in</k> [<s>"découvrir"</s>,'],['','                  <s>"expérimenter"</s>,'],['','                  <s>"créer"</s>,'],['','                  <s>"innover"</s>]:'],['','        jeune.progresser(etape)'],['','    <k>return</k> <s>"un projet concret"</s>']];
const src=lines.map(l=>l[0]==='c'?'<span class="c">'+l[1]+'</span>':l[1].replace(/<k>/g,'<span class="k">').replace(/<s>/g,'<span class="s">').replace(/<\/[ks]>/g,'</span>'));
let li=0,ci=0;const code=$('#code');
const plain=h=>h.replace(/<[^>]+>/g,'');
function type(){
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){code.innerHTML=src.join('\n');return}
  const full=src.slice(0,li).join('\n')+(li?'\n':'');
  const cur=src[li]||'';let out='',n=0,inTag=false;
  for(const ch of cur){if(ch==='<')inTag=true;if(!inTag)n++;out+=ch;if(ch==='>')inTag=false;if(n>=ci&&!inTag)break}
  code.innerHTML=full+out+'<span class="cur"></span>';
  ci++;if(ci>plain(cur).length){li++;ci=0;if(li>=src.length){code.innerHTML=src.join('\n')+'<span class="cur"></span>';return}}
  setTimeout(type,28);
}
type();
// counters + reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');
  e.target.querySelectorAll('[data-n]').forEach(b=>{const t=+b.dataset.n,p=b.dataset.p||'';let v=0;const s=()=>{v+=Math.max(1,t/24);if(v>=t){b.textContent=p+t;return}b.textContent=Math.round(v);requestAnimationFrame(s)};s()});
  e.target.querySelectorAll('[data-w]').forEach(i=>i.style.width=i.dataset.w+'%');io.unobserve(e.target)}),{threshold:.2});
$$('.rv,#bars').forEach(e=>io.observe(e));
// calculator
const fmt=n=>n.toString().replace('.',',');
let d=2;const calc=()=>{
  const w=+$('#wk').value,spw=+$('#spw').value,g=+$('#grp').value,j=+$('#jpg').value,s=w*spw,h=s*d,m=Math.round(w/4);
  $('#wkv').textContent=w;$('#spwv').textContent=spw;$('#grpv').textContent=g;$('#jpgv').textContent=j;
  $('#hrs').textContent=fmt(h)+' h';
  $('#ses').textContent=s+' séances de '+(d===1.5?'1 h 30':d+' h')+' ('+spw+'/semaine) sur '+w+' semaines';
  $('#tot').textContent=g*j+' jeunes au total · '+fmt(h*g)+' h d’encadrement ('+g+' groupe'+(g>1?'s':'')+')';
  // stats only get rewritten once their count-up animation has been revealed
  [['#st-m',m+1,m+'–'],['#st-s',spw,''],['#st-w',w,'']].forEach(([id,n,p])=>{const b=$(id);b.dataset.n=n;b.dataset.p=p;if(b.closest('.in'))b.textContent=p+n});
};
$$('#dur button').forEach(b=>b.onclick=()=>{d=+b.dataset.v;$$('#dur button').forEach(x=>x.classList.toggle('on',x===b));calc()});
['#wk','#spw','#grp','#jpg'].forEach(id=>$(id).oninput=calc);calc();
// parcours
const P=[
{n:'Explorer',pub:'7e et 8e année du collège',l:['Culture numérique et logique','Programmation visuelle','Premiers pas en Python','Initiation à la robotique','Projets guidés'],d:['Scratch et premières instructions Python','Découverte et page simple','Micro:bit et séquences guidées','Découverte des usages','Mini-projet accompagné']},
{n:'Builder',pub:'9e année du collège et début du lycée',l:['Python fondamental','Algorithmes et résolution','Web interactif','Git et GitHub','Projets en équipe'],d:['Python : conditions, boucles, fonctions','Site interactif, commits','Capteurs et automatisation','Données simples, classification guidée','Projet d’équipe avec rôles']},
{n:'Innovator',pub:'Lycée avancé jusqu’à la 5e année',l:['Python approfondi','Applications et APIs','IoT et prototypage','Data et découverte de l’IA','Projet autonome'],d:['Python avancé, modularité, APIs','Application structurée, branches','ESP32, collecte et traitement','Modèles, limites et biais','Projet autonome et documenté']}];
const dom=['Programmation','Web et collaboration','Robotique et IoT','Données et IA','Projet'];
const tabs=$('#tabs');
P.forEach((p,i)=>{const b=document.createElement('button');b.textContent=p.n;b.setAttribute('role','tab');b.onclick=()=>showP(i);tabs.append(b)});
function showP(i){const p=P[i];$$('#tabs button').forEach((b,j)=>{b.classList.toggle('on',i===j);b.setAttribute('aria-selected',i===j)});
$('#pane').innerHTML=`<div class="card"><h3>${p.n}</h3><p class="mut">${p.pub}</p><ul>${p.l.map(x=>'<li>'+x+'</li>').join('')}</ul></div><div class="card"><h3>Ce qui est attendu</h3><dl class="dl" style="margin-top:14px">${dom.map((x,k)=>`<dt>${x}</dt><dd>${p.d[k]}</dd>`).join('')}</dl></div>`}
showP(0);
// phases
const F=[
{w:2,s:'S1–2',t:'Immersion',d:'Installer les repères, les bonnes pratiques et les premiers réflexes.',l:['Découvrir CodeFusion et le parcours','Prendre en main l’ordinateur et les outils','Comprendre internet, la recherche et la sécurité','Introduire les outils collaboratifs','Réaliser un diagnostic initial'],p:'Livrables : diagnostic initial, règles du groupe, fiche de progression.'},
{w:5,s:'S3–7',t:'Logique',d:'Construire les premiers réflexes de résolution de problèmes.',l:['Décomposer un problème','Construire une suite d’instructions','Utiliser conditions et répétitions','Découvrir algorithmes et pseudocode','Programmer avec Scratch ou Blockly'],p:'Projet : créer un jeu interactif simple.'},
{w:8,s:'S8–15',t:'Python',d:'Consolider la logique avec un langage lisible et polyvalent.',l:['Variables, types et opérateurs','Conditions, boucles et fonctions','Listes et dictionnaires','Erreurs, tests et débogage','Fichiers et premières données'],p:'Mini-projets : calculatrice, jeu de devinette, quiz, gestionnaire de notes, application de bibliothèque.'},
{w:6,s:'S16–21',t:'Création web',d:'Passer d’un programme local à une création numérique partageable.',l:['HTML, CSS et principes UX simples','Maquette et navigation','Git : dépôt, commits, historique, binôme','GitHub, README et publication encadrée','Respect des droits'],p:'Projet : un mini-site pour une initiative scolaire, une association ou un projet local.'},
{w:8,s:'S22–29',t:'Robotique et IA',d:'Relier le code au monde physique et découvrir les usages responsables des données.',l:['LED, résistances, boutons, moteurs','Micro:bit ou Arduino, prototypage sécurisé','Capteurs, collecte et visualisation (ESP32)','Qu’est-ce qu’un modèle ? Classification','Biais, limites et éthique'],p:'Exemples : mini-station météo, arrosage intelligent, détecteur de présence, robot suiveur.'},
{w:7,s:'S30–36',t:'Projet final',d:'Mobiliser les compétences autour d’un besoin concret : eau, environnement, vie scolaire, inclusion ou besoins associatifs.',l:['Identifier un problème et comprendre les utilisateurs','Concevoir la solution et ses fonctionnalités','Réaliser un prototype et documenter','Tester, corriger et améliorer','Présenter et expliquer ses choix'],p:'Livrables : prototype, dépôt ou dossier projet, documentation, présentation et portfolio.'}];
const tl=$('#tl');F.forEach((f,i)=>{const b=document.createElement('button');b.style.flex=f.w;b.innerHTML=f.t+'<span>'+f.s+'</span>';b.onclick=()=>showF(i);tl.append(b)});
function showF(i){const f=F[i];$$('#tl button').forEach((b,j)=>b.classList.toggle('on',i===j));
$('#ph').innerHTML=`<div><h3>${f.t}</h3><p style="margin-top:12px;color:#b9c8e6">Semaines ${f.s.slice(1).replace('–',' à ')}. ${f.d}</p></div><div><ul>${f.l.map(x=>'<li>'+x+'</li>').join('')}</ul><em>${f.p}</em></div>`}
showF(2);
// session
const S=[['Accueil',10,'Retrouver le groupe, rappeler l’objectif de la séance.'],['Concept',15,'Une notion expliquée simplement, avec des supports visuels.'],['Démo',15,'Le formateur montre, pas à pas, comment faire.'],['Challenge',25,'Un défi court pour s’exercer, seul ou en binôme.'],['Projet',40,'Le temps fort : on construit, on se trompe, on corrige.'],['Restitution',10,'Chacun montre ce qui fonctionne et explique ses choix.']];
const se=$('#sess');S.forEach((s,i)=>{const b=document.createElement('button');b.style.setProperty('--m',s[1]);b.innerHTML='<b>'+s[1]+' min</b>'+s[0];b.onclick=()=>{$$('#sess button').forEach(x=>x.classList.toggle('on',x===b));$('#sinfo').innerHTML='<b>'+s[0]+'.</b> '+s[2]};se.append(b)});se.children[4].click();
// briefs
const B=[
{t:'Mon jeu d’arcade',ph:'Phase Logique · Explorer',d:'2 semaines · en binôme',ctx:'La médiathèque du quartier organise un après-midi jeux et cherche des mini-jeux créés par des jeunes.',mis:'Concevoir un jeu Scratch jouable en moins de 3 minutes, avec un score et plusieurs niveaux de difficulté.',liv:['Jeu publié dans le studio Scratch de la classe','Fiche des règles du jeu','Démonstration de 2 minutes'],crit:['Le jeu fonctionne sans bug bloquant','Utilisation de conditions, de boucles et de variables','Règles compréhensibles par un nouveau joueur','Chaque membre explique une partie du programme'],comp:['Pensée computationnelle','Programmation visuelle','Collaboration']},
{t:'Gestionnaire de notes',ph:'Phase Python · Builder',d:'2 semaines · en binôme',ctx:'Des élèves veulent suivre leurs notes et calculer leurs moyennes sans tableur.',mis:'Développer un programme Python qui permet de saisir des notes, calculer des moyennes et sauvegarder les données.',liv:['Code Python commenté','Dépôt GitHub avec README','Jeu de tests simples'],crit:['Calculs justes, y compris les cas limites','Code découpé en fonctions','Données sauvegardées dans un fichier','README clair : installation et utilisation'],comp:['Programmation Python','Git et GitHub','Documentation']},
{t:'Web for Good',ph:'Phase Création web · Builder',d:'3 semaines · en équipe de 3',ctx:'Une association locale n’a pas de site et souhaite présenter ses actions et recruter des bénévoles.',mis:'Concevoir et publier un site vitrine responsive qui répond au besoin réel de l’association.',liv:['Maquette validée par l’association','Site HTML et CSS publié','Dépôt GitHub avec historique de commits','Présentation au client'],crit:['Le site répond au besoin exprimé','Lisible sur mobile et sur ordinateur','Textes et images respectent les droits','Chaque membre a contribué au dépôt'],comp:['Développement web','Gestion de projet','Communication']},
{t:'Arrosage intelligent',ph:'Phase Robotique et IA · Innovator',d:'3 semaines · en équipe de 3',ctx:'Le jardin pédagogique de l’école manque d’eau pendant les vacances.',mis:'Prototyper un système qui mesure l’humidité du sol, déclenche l’arrosage et affiche les mesures.',liv:['Prototype ESP32 fonctionnel','Schéma de câblage','Tableau de bord des mesures','Fiche sécurité et limites du système'],crit:['Mesures fiables et seuil réglable','Montage propre et sécurisé','Données visualisées clairement','Réflexion sur l’économie d’eau'],comp:['Électronique et prototypage','Objets connectés','Esprit critique']}];
const ul=a=>'<ul>'+a.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
function showB(i){const b=B[i];$$('#bt button').forEach((x,j)=>{x.classList.toggle('on',i===j);x.setAttribute('aria-selected',i===j)});
$('#bf').innerHTML=`<div class="brief"><span class="btag">Brief</span><h3>${b.t}</h3><p class="mut">${b.ph} · ${b.d}</p><div class="bg"><div><h4>Contexte</h4><p>${b.ctx}</p><h4>Mission</h4><p>${b.mis}</p><h4>Compétences visées</h4><div class="bc">${b.comp.map(c=>'<code>'+c+'</code>').join('')}</div></div><div><h4>Livrables</h4>${ul(b.liv)}<h4>Critères de réussite</h4>${ul(b.crit)}</div></div></div>`}
B.forEach((b,i)=>{const x=document.createElement('button');x.textContent=b.t;x.setAttribute('role','tab');x.onclick=()=>showB(i);$('#bt').append(x)});showB(1);
// competences
const C={CT:['Culture numérique et citoyenneté','Pensée computationnelle et algorithmique','Programmation visuelle et logique','Programmation Python','Développement web : HTML et CSS','Gestion de versions : Git et GitHub','Bases d’électronique et prototypage','Robotique et systèmes embarqués','Objets connectés et collecte de données','Données et notions fondamentales d’IA','Gestion de projet numérique','Documentation et présentation technique'],CS:['Communiquer clairement','Collaborer et contribuer à une équipe','Développer son autonomie','Analyser et résoudre un problème','Faire preuve de créativité','Exercer son esprit critique','S’organiser et gérer son temps','Persévérer et apprendre de ses erreurs','Adopter un comportement numérique responsable','Partager ses connaissances et apprendre entre pairs']};
function showC(k){$$('.chip').forEach(c=>c.classList.toggle('on',c.dataset.k===k));$('#cl').innerHTML=C[k].map((t,i)=>`<div><code>${k}${String(i+1).padStart(2,'0')}</code>${t}</div>`).join('')}
$$('.chip').forEach(c=>c.onclick=()=>showC(c.dataset.k));showC('CT');
// weights
$('#bars').innerHTML=[['Compétences techniques',35],['Projet',25],['Collaboration',15],['Autonomie et résolution',15],['Communication',10]].map(r=>`<div class="bar-r"><span>${r[0]}</span><div class="trk"><i data-w="${r[1]*2.5}"></i></div><b>${r[1]} %</b></div>`).join('');
// events
const E=[
{t:'Rencontre',w:'S1',n:'Journée de lancement',d:'Demi-journée',x:'Accueil des jeunes et des familles, présentation du programme et ateliers découverte en petits groupes.',p:'familles, établissements'},
{t:'Visite',w:'S5',n:'Dans les coulisses d’internet',d:'Demi-journée',x:'Visite d’un opérateur ou d’un centre de données : réseaux, serveurs, sécurité et métiers techniques.',p:'opérateur télécom, entreprise IT'},
{t:'Défi',w:'S7',n:'Scratch Game Jam',d:'1 journée',x:'En binôme, créer un jeu sur un thème imposé, puis le faire tester par les autres équipes. Clôture de la phase Logique.',p:'formateurs, parents invités'},
{t:'Rencontre',w:'S11',n:'Un métier, un parcours',d:'2 h',x:'Développeurs, ingénieures, designers et entrepreneurs racontent leur parcours et répondent aux questions.',p:'professionnels, anciens élèves'},
{t:'Défi',w:'S13',n:'Semaine du code',d:'1 semaine',x:'Défis courts chaque jour, ouverts à d’autres classes : les jeunes du programme deviennent mentors.',p:'établissements scolaires'},
{t:'Hackathon',w:'S15',n:'Mini-hackathon Python',d:'1 journée',x:'Résoudre en équipe des défis algorithmiques à difficulté croissante, avec un classement bienveillant.',p:'mentors techniques'},
{t:'Visite',w:'S18',n:'Une journée chez les développeurs',d:'Demi-journée',x:'Découvrir une équipe tech : outils, méthodes agiles, revue de code et démonstration produit.',p:'entreprise partenaire'},
{t:'Défi',w:'S21',n:'Web for Good',d:'1 journée',x:'Créer le site d’une association locale à partir de son besoin réel, puis le lui présenter.',p:'associations locales'},
{t:'Visite',w:'S24',n:'FabLab et université',d:'Demi-journée',x:'Imprimantes 3D, découpe laser, laboratoires : découvrir le prototypage et les filières d’études.',p:'FabLab, universités et écoles de la région'},
{t:'Rencontre',w:'S27',n:'Conférence IA et éthique',d:'2 h',x:'Usages concrets de l’IA, puis débat sur les biais, la vie privée et la désinformation.',p:'chercheurs, experts'},
{t:'Défi',w:'S29',n:'Compétition de robots',d:'1 journée',x:'Course de robots suiveurs de ligne et épreuves de capteurs, en équipes, devant un jury.',p:'sponsors matériel, familles'},
{t:'Hackathon',w:'S32',n:'Hackathon « Ma région connectée »',d:'2 jours',x:'Prototyper des solutions pour l’eau, l’agriculture, l’environnement ou la vie scolaire, face à un jury de partenaires.',p:'entreprises, collectivités, mentors'},
{t:'Exposition',w:'S36',n:'Demo Day et exposition',d:'1 journée',x:'Stands de projets, pitchs devant les familles et les partenaires, remise des attestations et des prix.',p:'familles, partenaires, presse locale'}];
function showE(t){$$('#evf button').forEach(b=>b.classList.toggle('on',b.textContent===t));
$('#ev').innerHTML=E.filter(e=>t==='Tous'||e.t===t).map(e=>`<div class="card"><div class="top"><span class="tag">${e.t}</span><span class="wk">${e.w}</span></div><h3>${e.n}</h3><p class="mut">${e.x}</p><small>${e.d} · Avec : ${e.p}</small></div>`).join('')}
['Tous',...new Set(E.map(e=>e.t))].forEach(t=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>showE(t);$('#evf').append(b)});showE('Tous');
// event formats
const A={
'Hackathon (2 jours)':[['J1 · 9h00','Accueil, présentation des thèmes, des règles et des critères du jury'],['J1 · 9h45','Formation d’équipes mixtes (niveaux et compétences)'],['J1 · 10h30','Idéation guidée : problème, utilisateurs, solution'],['J1 · 12h30','Déjeuner'],['J1 · 13h30','Développement du prototype, passage des mentors'],['J1 · 16h30','Point d’étape : 2 minutes par équipe'],['J2 · 9h00','Développement, tests et corrections'],['J2 · 12h00','Déjeuner et préparation du pitch'],['J2 · 14h00','Pitchs de 5 minutes et questions du jury'],['J2 · 16h00','Délibération, remise des prix et clôture']],
'Visite d’entreprise':[['Avant','En classe : présenter l’entreprise et préparer des questions'],['8h30','Départ encadré et rappel des consignes'],['9h30','Accueil, présentation de l’entreprise et de ses métiers'],['10h00','Visite des espaces et démonstration d’un produit'],['10h45','Atelier pratique animé par un collaborateur'],['11h30','Questions-réponses avec l’équipe'],['Après','Restitution en classe : ce que j’ai appris, le métier qui m’a marqué']],
'Demo Day':[['9h00','Installation des stands et répétition des pitchs'],['10h00','Ouverture officielle par CodeFusion et les partenaires'],['10h30','Visite libre des stands par les familles et les invités'],['14h00','Pitchs des projets finalistes'],['15h30','Remise des attestations, des prix et des portfolios'],['16h30','Bilan et perspectives pour l’année suivante']]};
function showA(k){$$('#agf button').forEach(b=>b.classList.toggle('on',b.textContent===k));$('#ag').innerHTML=A[k].map(([h,x])=>`<div><b>${h}</b><span>${x}</span></div>`).join('')}
Object.keys(A).forEach(k=>{const b=document.createElement('button');b.textContent=k;b.onclick=()=>showA(k);$('#agf').append(b)});showA('Hackathon (2 jours)');
// decisions
const D=['Public et groupes : niveaux exacts, nombre de groupes, effectif','Durée des séances : 1 h 30, 2 h ou 3 h ; calendrier et vacances','Équipement : un ordinateur par jeune ou par binôme ; nombre de kits','Valorisation : attestation, portfolio et/ou validation de compétences','Modèle économique : financement institutionnel, mécénat, sponsoring ou participation','Gouvernance : responsables, intervenants, partenaires, suivi des résultats'];
$('#ok').innerHTML=D.map(t=>`<li><label><input type="checkbox"><span>${t}</span></label></li>`).join('');
const upd=()=>{$('#pg').style.width=$$('#ok input:checked').length/D.length*100+'%'};$$('#ok input').forEach(i=>i.onchange=upd);
// nav dropdowns
const closeDd=except=>$$('.dd').forEach(d=>{if(d===except)return;d.classList.remove('open');d.firstElementChild.setAttribute('aria-expanded','false')});
$$('.dd>button').forEach(b=>b.onclick=()=>{const d=b.parentElement,o=d.classList.toggle('open');b.setAttribute('aria-expanded',o);closeDd(d)});
$$('.dd').forEach(d=>d.addEventListener('focusout',e=>{if(!d.contains(e.relatedTarget))closeDd()}));
document.addEventListener('click',e=>{if(!e.target.closest('.dd>button'))closeDd()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDd()});
// scroll spy
const links=$$('nav a');const spy=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id));$$('.dd').forEach(d=>d.classList.toggle('on',!!d.querySelector('a.on')))}),{rootMargin:'-40% 0px -55% 0px'});
$$('section[id]').forEach(s=>spy.observe(s));

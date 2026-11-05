const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement;
$('#th').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark'};

// helpers (all data below is static example data)
const LV=['Imiter','Adapter','Transposer'];
const PH=['Immersion','Logique','Python','Création web','Robotique et IA','Projet final'];
const pill=(t,c='')=>`<span class="pill ${c}">${t}</span>`;
const bar=p=>`<div class="trk"><i style="width:${p}%"></i></div>`;
const lv=n=>`<span class="lv">${[1,2,3].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')}</span>`;
const av=n=>`<span class="av sm">${n.split(' ').map(w=>w[0]).join('').slice(0,2)}</span>`;
const kpi=([l,v,s])=>`<div class="card kpi c3"><span>${l}</span><b>${v}</b><span>${s}</span></div>`;
const card=(c,id,t,body,x='')=>`<div class="card ${c}" id="${id}"><div class="ch"><h3>${t}</h3>${x}</div>${body}</div>`;
const tog=(off,on,act=false)=>`<button class="mini${act?' y':''}" data-tog data-off="${off}" data-on="${on}">${act?on:off}</button>`;
const tbl=(h,rows,cls='',id='')=>`<div class="tw"><table class="tbl ${cls}"><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody ${id?`id="${id}"`:''}>${rows}</tbody></table></div>`;
const obsLi=(who,meta,txt,lvl)=>`<div class="li"><div><b>${who}</b> <small class="mut">${meta}</small><p class="mut" style="margin-top:4px">${txt}</p></div>${pill(LV[lvl-1],'in')}</div>`;

// ---------- learner ----------
const LC=[['Pensée computationnelle',3],['Programmation visuelle',3],['Programmation Python',2],['Git et GitHub',1],['Collaborer en équipe',2],['Communiquer clairement',2],['Persévérer et apprendre de ses erreurs',3]];
const LP=[['Jeu de labyrinthe (Scratch)','Phase Logique','Terminé','ok'],['Calculatrice Python','Phase Python','Terminé','ok'],['Jeu de devinette','Phase Python','Terminé','ok'],['Gestionnaire de notes','Phase Python · avec Salma O.','En cours','wa'],['Mini-site pour une association','Phase Création web','À venir','']];
const LO=[['5 nov.','Karim E.','Très bonne autonomie sur les boucles. Prochaine étape : découper son code en fonctions.'],['29 oct.','Karim E.','A aidé son binôme à corriger une erreur d’indentation : bel esprit d’entraide.'],['22 oct.','Salma A.','Présentation claire du jeu de devinette ; penser à tester les cas limites.']];
const LE=[['13','Semaine du code',true],['15','Mini-hackathon Python',false],['18','Une journée chez les développeurs',false],['21','Web for Good',false]];
const LF=[['Nom complet','Yasmine Bennani'],['Identifiant','yasmine.bennani'],['Date de naissance','JJ / MM / AAAA'],['Établissement','[Nom de l’établissement]'],['Niveau scolaire','9e année du collège'],['Responsable légal','Fatima Bennani (mère)'],['Contact du responsable','+212 6 12 34 56 78 · f.bennani@exemple.ma'],['Autorisation parentale',pill('Signée','ok')],['Droit à l’image',pill('Non accordé','wa')],['Portfolio','github.com/[identifiant]']];

const childCard=(title)=>`<div class="card prof c8"><span class="av">YB</span><div class="grow"><h3>${title}</h3><p class="mut">Formateur référent : Karim El Idrissi</p>
<div class="ph6">${PH.map((p,i)=>`<i class="${i<2?'d':i===2?'on':''}" title="${p}"></i>`).join('')}</div>
<p class="mut sm">Phase 3 sur 6 : Python · Prochaine phase : Création web (semaine 16)</p></div></div>
<div class="card c4"><span class="pill in">Prochaine séance</span><h3 class="mt">Listes et dictionnaires</h3><p class="mut">Mercredi · 14h00 – 16h00<br>Salle Informatique 2</p><p class="sm mt">À préparer : terminer l’exercice « carnet d’adresses ».</p></div>`;
const LB=[['Code Python commenté',true],['Dépôt GitHub avec README',false],['Jeu de tests simples',false]];
const LBC=['Calculs justes, y compris les cas limites','Code découpé en fonctions','Données sauvegardées dans un fichier','README clair : installation et utilisation'];
const learnerBrief=()=>`<p><b>Gestionnaire de notes</b> · en binôme avec Salma O. · Phase Python</p>
<p class="mut" style="margin-top:6px">Mission : développer un programme Python qui permet de saisir des notes, calculer des moyennes et sauvegarder les données.</p>
<div class="grid mt"><div class="c6"><h4 class="bh">Livrables</h4>${LB.map(([n,d])=>`<div class="li"><span>${n}</span>${tog('À faire','Fait ✓',d)}</div>`).join('')}</div>
<div class="c6"><h4 class="bh">Critères de réussite</h4><ul class="crit">${LBC.map(c=>`<li>${c}</li>`).join('')}</ul></div></div>
<div class="cnt"><span class="mut sm">Jalon : revue de code avec le formateur samedi 15 novembre.</span>${tog('Déposer mon rendu','Rendu déposé ✓')}</div>`;

const learner=()=>`
<div id="d-top"><p class="mut">Mercredi 12 novembre · Semaine 12 sur 36</p><h1>Bonjour Yasmine</h1></div>
<div class="grid">
${childCard('Parcours Builder · Groupe B2')}
${[['Présence','92 %','22 séances sur 24'],['Briefs réalisés','3','1 en cours'],['Défis réussis','14','sur 18 proposés'],['Badges','5','dernier : Débogueur']].map(kpi).join('')}
${card('c12','l-brief','Brief en cours',learnerBrief(),pill('Échéance : mer. 19 nov.','wa'))}
${card('c6','l-comp','Mes compétences',LC.map(([n,l])=>`<div class="li"><span>${n}</span><span class="who">${lv(l)}<small class="mut w">${LV[l-1]}</small></span></div>`).join(''))}
${card('c6','l-proj','Mes briefs',LP.map(([n,p,s,c])=>`<div class="li"><div><b>${n}</b><br><small class="mut">${p}</small></div>${pill(s,c)}</div>`).join(''))}
${card('c6','l-obs','Carnet de progression',LO.map(([d,w,t])=>`<div class="li"><div><small class="mut">${d} · ${w}</small><p style="margin-top:2px">${t}</p></div></div>`).join(''))}
${card('c6','l-ev','Événements à venir',LE.map(([w,n,on])=>`<div class="li"><div><b>${n}</b><br><small class="mut">Semaine ${w}</small></div>${tog('S’inscrire','Inscrite ✓',on)}</div>`).join(''))}
${card('c12','l-prof','Mon profil',`<dl class="dl">${LF.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`,pill('Exemple de fiche'))}
</div>`;

// ---------- parent ----------
const PA=[['Mer. 12 nov.','Listes et dictionnaires','p'],['Sam. 8 nov.','Boucles et fonctions','p'],['Mer. 5 nov.','Fonctions','a'],['Sam. 1 nov.','Projet en binôme','p'],['Mer. 29 oct.','Débogage','j']];
const PAU=[['Participation au programme','Année 2026–2027',null],['Charte d’usage du numérique','Signée le 15 septembre',null],['Droit à l’image','Photos et vidéos pour la communication de l’école',['Accorder','Accordé ✓']],['Sortie : Une journée chez les développeurs','Semaine 18 · départ 8h30 depuis GDGSR',['Signer','Signée ✓']],['Mini-hackathon Python','Semaine 15 · samedi 9h – 17h',['Signer','Signée ✓']]];
const PM=[['Karim El Idrissi','Formateur','10 nov.','Yasmine progresse très bien en Python. Elle a présenté son projet avec beaucoup d’assurance.'],['Administration GDGSR','Admin','6 nov.','Rappel : l’autorisation pour la visite d’entreprise (semaine 18) est à signer avant le 20 novembre.'],['Karim El Idrissi','Formateur','5 nov.','Yasmine était absente mercredi. Merci de justifier l’absence depuis votre espace.']];
const PC=[['Formateur référent','Karim El Idrissi · karim.elidrissi@gdgsr.ma'],['Coordination','Administration GDGSR · +212 5XX XX XX XX'],['Créneaux de Yasmine','Mercredi 14h – 16h et samedi 10h – 12h · Salle Informatique 2'],['Adresse','GDGSR · [Adresse à compléter]']];
const msgLi=(f,r,d,t)=>`<div class="li"><div><b>${f}</b> ${pill(r,'in')} <small class="mut">${d}</small><p class="mut" style="margin-top:4px">${t}</p></div></div>`;
const presRight=s=>s==='p'?pill('Présente','ok'):s==='j'?pill('Absence justifiée','in'):`<span class="acts2">${pill('Absente','ko')}${tog('Justifier','Justifiée ✓')}</span>`;

const parent=()=>`
<div id="d-top"><p class="mut">Mercredi 12 novembre · Semaine 12 sur 36</p><h1>Bonjour Mme Bennani</h1></div>
<div class="grid">
${childCard('Yasmine Bennani · Parcours Builder · Groupe B2')}
${[['Présence','92 %','22 séances sur 24'],['Absences','2','1 à justifier'],['Briefs terminés','3','1 en cours'],['Autorisations','2','à signer']].map(kpi).join('')}
${card('c6','p-pres','Présences récentes',PA.map(([d,t,s])=>`<div class="li"><div><b>${d}</b><br><small class="mut">${t}</small></div>${presRight(s)}</div>`).join(''))}
${card('c6','p-aut','Autorisations',PAU.map(([n,d,t])=>`<div class="li"><div><b>${n}</b><br><small class="mut">${d}</small></div>${t?tog(...t):pill('Signée','ok')}</div>`).join(''))}
${card('c6','p-msg','Messages',`<div id="msgs">${PM.map(m=>msgLi(...m)).join('')}</div>
<form id="pmf" class="mt"><label class="fld"><span>Répondre au formateur</span><textarea name="m" rows="3" maxlength="300">Merci pour ce retour. L’absence du 5 novembre était due à un rendez-vous médical, je l’ai justifiée depuis l’espace.</textarea></label><button class="btn">Envoyer</button></form>`)}
${card('c6','p-prog','Progression de Yasmine',LC.slice(0,4).map(([n,l])=>`<div class="li"><span>${n}</span><span class="who">${lv(l)}<small class="mut w">${LV[l-1]}</small></span></div>`).join('')+LO.slice(0,2).map(([d,w,t])=>`<div class="li"><div><small class="mut">${d} · ${w}</small><p style="margin-top:2px">${t}</p></div></div>`).join(''))}
${card('c12','p-cont','Contacts et informations',`<dl class="dl">${PC.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`,tog('Demander un rendez-vous','Demande envoyée ✓'))}
</div>`;

// ---------- trainer ----------
const S=[['Yasmine Bennani','B2',72,'92 %','Autonome sur les boucles','Bon rythme','ok'],['Adam Tazi','B2',48,'78 %','Difficultés sur les fonctions','À accompagner','wa'],['Salma Ouali','B2',80,'100 %','Aide souvent ses pairs','Bon rythme','ok'],['Youssef Amrani','B1',35,'64 %','3 absences non justifiées','Absences','ko'],['Nour Chraibi','B1',66,'95 %','Projet bien documenté','Bon rythme','ok'],['Omar Fassi','B1',62,'85 %','Bon esprit d’équipe','Bon rythme','ok'],['Ilyas Berrada','E3',58,'88 %','Progresse en logique','Bon rythme','ok'],['Hiba Lahlou','E3',41,'90 %','Manque de confiance à l’oral','À accompagner','wa']];
const CALL=['Yasmine Bennani','Adam Tazi','Salma Ouali','Rania Bekkali','Mehdi Ziani','Aya Mansouri','Zakaria Hilali','Ines Cherkaoui'];
const EG=[['B1','Builder','Lun. & Jeu. 17h','15','Python'],['B2','Builder','Mer. 14h & Sam. 10h','14','Python'],['E3','Explorer','Mar. & Ven. 17h','14','Logique']];
const EP=[['Gestionnaire de notes','Yasmine B. & Salma O.','10 nov.'],['Quiz culture numérique','Adam Tazi','9 nov.'],['Jeu de devinette','Youssef Amrani','8 nov.'],['Bibliothèque en Python','Nour Chraibi','7 nov.'],['Jeu de labyrinthe','Hiba L. & Ilyas B.','6 nov.']];
const EO=[['Salma Ouali','Collaborer en équipe · 10 nov.','Organise bien le travail du binôme et répartit les tâches.',3],['Adam Tazi','Programmation Python · 8 nov.','Comprend les boucles, bloque encore sur le passage de paramètres.',1],['Nour Chraibi','Communiquer clairement · 7 nov.','README clair et complet pour son projet.',2]];
const EB=[['Gestionnaire de notes','B2','5 nov.','19 nov.',9,14,'En cours','in'],['Quiz culture numérique','B1','3 nov.','17 nov.',12,15,'En cours','in'],['Mon jeu d’arcade','E3','27 oct.','10 nov.',14,14,'À corriger','wa'],['Web for Good','B1 · B2','—','Semaine 16',0,29,'Planifié','']];
const sRows=g=>S.filter(s=>g==='Tous'||s[1]===g).map(s=>`<tr><td><span class="who">${av(s[0])}${s[0]}</span></td><td>${s[1]}</td><td><div class="who">${bar(s[2])}<small>${s[2]} %</small></div></td><td>${s[3]}</td><td class="mut">${s[4]}</td><td>${pill(s[5],s[6])}</td></tr>`).join('');

const trainer=()=>`
<div id="d-top"><p class="mut">Mercredi 12 novembre · Semaine 12 sur 36</p><h1>Bonjour Karim</h1></div>
<div class="grid">
${[['Groupes','3','Builder et Explorer'],['Élèves suivis','43','répartis sur 3 groupes'],['Présence moyenne','91 %','sur les 4 dernières semaines'],['À évaluer','5','rendus de briefs']].map(kpi).join('')}
${card('c6','e-call','Séance du jour',`<p><b>Groupe B2</b> · 14h00 – 16h00 · Salle Informatique 2<br><span class="mut">Thème : listes et dictionnaires</span></p>
${CALL.map(n=>`<div class="li"><span class="who">${av(n)}${n}</span><button class="mini y" data-call>Présent</button></div>`).join('')}
<div class="cnt"><b id="cnt">${CALL.length} / ${CALL.length} présents</b><button class="btn" id="save-call">Enregistrer l’appel</button></div><p class="mut sm mt" id="saved"></p>`,pill('Appel','in'))}
${card('c6','e-grp','Mes groupes',tbl(['Groupe','Parcours','Créneau','Élèves','Phase'],EG.map(g=>`<tr>${g.map((x,i)=>`<td>${i?x:`<b>${x}</b>`}</td>`).join('')}</tr>`).join('')))}
${card('c12','e-briefs','Briefs',tbl(['Brief','Groupe','Lancé le','Échéance','Rendus','Statut'],EB.map(b=>`<tr><td><b>${b[0]}</b></td><td>${b[1]}</td><td>${b[2]}</td><td>${b[3]}</td><td><div class="who">${bar(b[4]/b[5]*100)}<small>${b[4]}/${b[5]}</small></div></td><td>${pill(b[6],b[7])}</td></tr>`).join('')),tog('Publier un nouveau brief','Brouillon créé ✓'))}
${card('c12','e-suivi','Suivi des élèves',tbl(['Élève','Groupe','Progression','Présence','Dernière observation','Statut'],sRows('Tous'),'','s-body'),`<div class="seg" style="margin:0">${['Tous','B1','B2','E3'].map((g,i)=>`<button data-gf="${g}" class="${i?'':'on'}">${g}</button>`).join('')}</div>`)}
${card('c6','e-eval','Évaluation rapide',`<form id="evf">
<div class="row2"><label class="fld"><span>Élève</span><select name="j">${S.map(s=>`<option>${s[0]}</option>`).join('')}</select></label>
<label class="fld"><span>Compétence</span><select name="c">${['Pensée computationnelle','Programmation Python','Git et GitHub','Collaborer en équipe','Communiquer clairement','Développer son autonomie'].map(c=>`<option>${c}</option>`).join('')}</select></label></div>
<div class="fld"><span>Niveau observé</span><div class="seg" id="lvs">${LV.map((l,i)=>`<button type="button" data-lv="${i+1}" class="${i===1?'on':''}">${l}</button>`).join('')}</div></div>
<label class="fld"><span>Observation</span><textarea name="m" rows="3" maxlength="300" placeholder="Ce que l’élève a réussi, ses difficultés, la prochaine étape…">A su découper son programme en fonctions réutilisables. Prochaine étape : ajouter des tests simples.</textarea></label>
<button class="btn">Enregistrer l’observation</button></form>`)}
${card('c6','e-obs','Observations récentes',`<div id="obs">${EO.map(o=>obsLi(...o)).join('')}</div>`)}
${card('c12','e-proj','Rendus à évaluer',tbl(['Brief','Auteur(s)','Déposé le','Dépôt',''],EP.map(([p,a,d])=>`<tr><td><b>${p}</b></td><td>${a}</td><td>${d}</td><td class="mut">github.com/[dépôt]</td><td>${tog('Évaluer','Évalué ✓')}</td></tr>`).join('')))}
</div>`;

// ---------- admin ----------
const G=[['E1','Explorer','Salma Amrani','Lun. & Jeu. 17h','Salle Info 1',16,16],['E2','Explorer','Salma Amrani','Mar. & Ven. 17h','Salle Info 1',15,16],['E3','Explorer','Karim El Idrissi','Mar. & Ven. 17h','Salle Info 2',14,16],['B1','Builder','Karim El Idrissi','Lun. & Jeu. 17h','Salle Info 2',15,16],['B2','Builder','Karim El Idrissi','Mer. 14h & Sam. 10h','Salle Info 2',14,16],['B3','Builder','Mehdi Benjelloun','Mer. 14h & Sam. 10h','FabLab',16,16],['I1','Innovator','Mehdi Benjelloun','Sam. 9h – 12h','FabLab',14,15],['I2','Innovator','Imane Rachidi','Sam. 14h – 17h','FabLab',13,15]];
const TOT=G.reduce((a,g)=>a+g[5],0),CAP=G.reduce((a,g)=>a+g[6],0);
const CONF=[['Autorisations parentales',TOT-7],['Charte numérique signée',TOT],['Fiches sanitaires',TOT-12],['Droit à l’image accordé',TOT-21]];
const INS=[['Rayan Kettani','8e année','Explorer','Mme Kettani','Signée','ok'],['Lina Sbai','Tronc commun','Builder','M. Sbai','Signée','ok'],['Anas Idrissi','2e bac','Innovator','Mme Idrissi','Manquante','ko'],['Meryem Alaoui','7e année','Explorer','M. Alaoui','En attente','wa']];
const U=[['Admin GDGSR','Admin','admin@gdgsr.ma','Actif','Aujourd’hui'],['Karim El Idrissi','Formateur','karim.elidrissi@gdgsr.ma','Actif','Aujourd’hui'],['Salma Amrani','Formateur','salma.amrani@gdgsr.ma','Actif','Hier'],['Mehdi Benjelloun','Formateur','mehdi.benjelloun@gdgsr.ma','Actif','Il y a 2 jours'],['Imane Rachidi','Formateur','imane.rachidi@gdgsr.ma','Invitation envoyée','—'],['Fatima Bennani','Parent','f.bennani@exemple.ma','Actif','Hier'],['Samira Kettani','Parent','samira.kettani@exemple.ma','Invitation envoyée','—'],['Yasmine Bennani','Élève','yasmine.bennani','Actif','Aujourd’hui'],['Adam Tazi','Élève','adam.tazi','Actif','Hier'],['Youssef Amrani','Élève','youssef.amrani','Suspendu','Il y a 3 semaines'],['Nour Chraibi','Élève','nour.chraibi','Actif','Aujourd’hui']];
const PERM=[['Voir les tableaux de bord','Le sien','Son enfant','Ses groupes','Tous'],['Déposer les rendus de briefs, compléter le portfolio','✓','—','—','—'],['Créer et publier des briefs','—','—','Ses groupes','✓'],['S’inscrire aux événements','✓','Autoriser','✓','✓'],['Faire l’appel, saisir des observations','—','—','Ses groupes','✓'],['Justifier une absence','—','✓','Consulter','✓'],['Évaluer les compétences','Auto-évaluation','Consulter','Ses groupes','✓'],['Signer autorisations et droit à l’image','—','✓','Consulter','✓'],['Échanger des messages','Ses formateurs','Formateurs et admin','Ses groupes et familles','Tous'],['Valider les inscriptions','—','—','—','✓'],['Créer des comptes formateurs','—','—','—','✓'],['Gérer groupes, calendrier et événements','—','—','Proposer','✓'],['Exporter rapports et statistiques','—','—','Ses groupes','✓']];
const ST={'Actif':'ok','Invitation envoyée':'wa','Suspendu':'ko'},RC={'Admin':'ko','Formateur':'in','Parent':'ok','Élève':''};
let uRole='Tous';
const uRows=()=>{
  const q=($('#q')?.value||'').trim().toLowerCase();
  return U.filter(u=>(uRole==='Tous'||u[1]===uRole)&&(u[0]+' '+u[2]).toLowerCase().includes(q))
    .map(u=>`<tr><td><span class="who">${av(u[0])}${u[0]}</span></td><td>${pill(u[1],RC[u[1]])}</td><td class="mut">${u[2]}</td><td>${pill(u[3],ST[u[3]])}</td><td class="mut">${u[4]}</td></tr>`).join('')
    ||'<tr><td colspan="5" class="mut">Aucun utilisateur trouvé.</td></tr>';
};

const admin=()=>`
<div id="d-top"><p class="mut">Année 2026–2027 · Semaine 12 sur 36</p><h1>Pilotage du programme</h1></div>
<div class="grid">
${[['Élèves inscrits',TOT,`sur ${CAP} places`],['Demandes en attente',`<span id="pend">${INS.length}</span>`,'inscriptions à valider'],['Équipe pédagogique','4','3 actifs, 1 invitation'],['Autorisations manquantes',TOT-CONF[0][1],'relances à envoyer']].map(kpi).join('')}
${card('c8','a-ins','Inscriptions en attente',tbl(['Élève','Niveau','Parcours proposé','Responsable','Autorisation',''],INS.map(([n,nv,p,r,a,c])=>`<tr><td><span class="who">${av(n)}${n}</span></td><td>${nv}</td><td>${p}</td><td>${r}</td><td>${pill(a,c)}</td><td><span class="acts2">${c==='ok'?'<button class="mini y" data-ins="ok">Valider</button>':tog('Relancer','Relance envoyée')}<button class="mini" data-ins="ko">Refuser</button></span></td></tr>`).join('')),pill('Validation après autorisation parentale','wa'))}
${card('c4','a-rep','Répartition par parcours',['Explorer','Builder','Innovator'].map(p=>{const n=G.filter(g=>g[1]===p).reduce((a,g)=>a+g[5],0);return `<div class="li"><span style="min-width:80px">${p}</span>${bar(n/TOT*100)}<b>${n}</b></div>`}).join(''))}
${card('c12','a-grp','Groupes et créneaux',tbl(['Groupe','Parcours','Formateur','Créneau','Salle','Remplissage'],G.map(g=>`<tr><td><b>${g[0]}</b></td><td>${g[1]}</td><td>${g[2]}</td><td>${g[3]}</td><td>${g[4]}</td><td><div class="who">${bar(g[5]/g[6]*100)}<small>${g[5]}/${g[6]}</small></div></td></tr>`).join('')))}
${card('c8','a-usr','Utilisateurs',`<div class="seg">${['Tous','Élève','Parent','Formateur','Admin'].map((r,i)=>`<button data-rf="${r}" class="${i?'':'on'}">${r}</button>`).join('')}</div>${tbl(['Nom','Rôle','Identifiant','Statut','Dernière connexion'],uRows(),'','u-body')}`,'<input id="q" class="search" type="search" placeholder="Rechercher…" aria-label="Rechercher un utilisateur">')}
${card('c4','a-conf','Conformité',CONF.map(([n,v])=>`<div class="li" style="display:block"><div class="ch" style="margin-bottom:6px"><span>${n}</span><b>${v} / ${TOT}</b></div>${bar(v/TOT*100)}</div>`).join(''))}
${card('c12','a-perm','Rôles et permissions',tbl(['Action','Élève','Parent','Formateur','Admin'],PERM.map(r=>`<tr>${r.map((x,i)=>`<td>${i===0?x:x==='✓'?pill('✓','ok'):x==='—'?'<span class="mut">—</span>':pill(x,'in')}</td>`).join('')}</tr>`).join(''),'perm'))}
</div>`;

// ---------- roles ----------
const R={
  eleve:{n:'Yasmine Bennani',lbl:'Espace élève',html:learner,side:[['d-top','Tableau de bord'],['l-brief','Brief en cours'],['l-comp','Compétences'],['l-proj','Mes briefs'],['l-obs','Carnet de progression'],['l-ev','Événements'],['l-prof','Mon profil']]},
  parent:{n:'Fatima Bennani',lbl:'Espace parent',html:parent,side:[['d-top','Vue d’ensemble'],['p-pres','Présences'],['p-aut','Autorisations'],['p-msg','Messages'],['p-prog','Progression'],['p-cont','Contacts']]},
  formateur:{n:'Karim El Idrissi',lbl:'Espace formateur',html:trainer,side:[['d-top','Tableau de bord'],['e-call','Séance du jour'],['e-grp','Mes groupes'],['e-briefs','Briefs'],['e-suivi','Suivi des élèves'],['e-eval','Évaluation'],['e-proj','Rendus à évaluer']]},
  admin:{n:'Admin GDGSR',lbl:'Administration',html:admin,side:[['d-top','Vue d’ensemble'],['a-ins','Inscriptions'],['a-grp','Groupes'],['a-usr','Utilisateurs'],['a-conf','Conformité'],['a-perm','Rôles et permissions']]}
};
let lvSel=2;
function render(){
  const r=R[location.hash.slice(1)]?location.hash.slice(1):'eleve',x=R[r];
  $$('#roles button').forEach(b=>b.classList.toggle('on',b.dataset.r===r));
  $('#me-av').textContent=x.n.split(' ').map(w=>w[0]).join('').slice(0,2);$('#me-n').textContent=x.n;
  $('#side').innerHTML=`<small>${x.lbl}</small>`+x.side.map(([id,t])=>`<button data-go="${id}">${t}</button>`).join('');
  uRole='Tous';lvSel=2;
  $('#dash').innerHTML=x.html();
  scrollTo(0,0);
}
$$('#roles button').forEach(b=>b.onclick=()=>{location.hash=b.dataset.r});
addEventListener('hashchange',render);
$('#side').onclick=e=>{const b=e.target.closest('[data-go]');if(b)document.getElementById(b.dataset.go).scrollIntoView({behavior:'smooth'})};

// interactions
const dash=$('#dash');
const pick=(b,sel)=>b.parentElement.querySelectorAll(sel).forEach(x=>x.classList.toggle('on',x===b));
dash.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  if(b.hasAttribute('data-tog')){const on=b.classList.toggle('y');b.textContent=on?b.dataset.on:b.dataset.off}
  else if(b.hasAttribute('data-call')){
    const abs=b.classList.toggle('ko');b.classList.toggle('y',!abs);b.textContent=abs?'Absent':'Présent';
    $('#cnt').textContent=`${$$('[data-call].y').length} / ${$$('[data-call]').length} présents`;
  }
  else if(b.id==='save-call')$('#saved').textContent='Appel enregistré à '+new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})+'. Les familles des absents seront notifiées.';
  else if(b.dataset.gf){pick(b,'button');$('#s-body').innerHTML=sRows(b.dataset.gf)}
  else if(b.dataset.rf){pick(b,'button');uRole=b.dataset.rf;$('#u-body').innerHTML=uRows()}
  else if(b.dataset.lv){pick(b,'button');lvSel=+b.dataset.lv}
  else if(b.dataset.ins){
    const ok=b.dataset.ins==='ok';
    b.closest('td').innerHTML=pill(ok?'Validée':'Refusée',ok?'ok':'ko');
    $('#pend').textContent=$$('[data-ins="ko"]').length;
  }
});
dash.addEventListener('input',e=>{if(e.target.id==='q')$('#u-body').innerHTML=uRows()});
dash.addEventListener('submit',e=>{
  if(e.target.id==='pmf'){
    e.preventDefault();
    const m=e.target.elements.m,w=document.createElement('div');
    w.innerHTML=msgLi('Fatima Bennani','Parent','à l’instant','');
    w.querySelector('p').textContent=m.value.trim()||'—';
    $('#msgs').prepend(w.firstElementChild);m.value='';
    return;
  }
  if(e.target.id!=='evf')return;
  e.preventDefault();
  const f=e.target.elements,w=document.createElement('div');
  w.innerHTML=obsLi('','','',lvSel);
  const li=w.firstElementChild,[b,s,p]=li.querySelectorAll('b,small,p');
  b.textContent=f.j.value;s.textContent=f.c.value+' · à l’instant';p.textContent=f.m.value.trim()||'Sans commentaire.';
  $('#obs').prepend(li);f.m.value='';
});
render();

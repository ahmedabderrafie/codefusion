const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const root=document.documentElement;
$('#th').onclick=()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark'};

// tabs
$$('#atabs button').forEach(b=>b.onclick=()=>{
  $$('#atabs button').forEach(x=>x.classList.toggle('on',x===b));
  $('#fin').hidden=b.dataset.t!=='in';$('#fup').hidden=b.dataset.t!=='up';$('#done').hidden=true;
});
$$('.eye').forEach(b=>b.onclick=()=>{const i=b.previousElementSibling,show=i.type==='password';i.type=show?'text':'password';b.textContent=show?'Masquer':'Afficher'});

// sign in (demo: redirects to the chosen role's space)
let role='apprenant';
const demo={apprenant:'yasmine.bennani',parent:'f.bennani@exemple.ma',formateur:'karim.elidrissi@codefusion.ma',admin:'admin@codefusion.ma'};
const setRole=r=>{role=r;$$('#role button').forEach(b=>b.classList.toggle('on',b.dataset.r===r));$('#em').value=demo[r];$('#pw').value='demo1234'};
$$('#role button').forEach(b=>b.onclick=()=>setRole(b.dataset.r));
$('#fin').onsubmit=e=>{e.preventDefault();location.href='espace.html#'+role};

// sign up wizard
const steps=$$('.step');let st=0;
const go=n=>{
  st=n;steps.forEach((s,i)=>s.classList.toggle('on',i===n));
  $$('.stepper i').forEach((x,i)=>x.classList.toggle('on',i<=n));
  $('#sttl').textContent=`Étape ${n+1} sur ${steps.length} · ${steps[n].dataset.t}`;
  $('#prev').style.visibility=n?'visible':'hidden';
  $('#next').textContent=n===steps.length-1?'Envoyer la demande':'Continuer';
};
const valid=()=>[...steps[st].querySelectorAll('input,select')].every(i=>i.reportValidity());
$('#prev').onclick=()=>go(st-1);
$('#fup').onsubmit=e=>{
  e.preventDefault();
  if(!valid())return;
  if(st<steps.length-1)return go(st+1);
  $('#fup').hidden=true;$('#done').hidden=false;$('#dn').textContent=$('#fn').value;
};
const P={'7e':'Explorer','8e':'Explorer','9e':'Builder','TC':'Builder','1B':'Innovator','2B':'Innovator'};
$('#niv').onchange=e=>{const p=P[e.target.value];$('#parc').textContent=p?`Parcours proposé : ${p}, confirmé après le diagnostic initial.`:''};
$('#niv').onchange({target:$('#niv')});
const pw1=$('#pw1'),pw2=$('#pw2');
pw1.oninput=pw2.oninput=()=>pw2.setCustomValidity(pw2.value&&pw2.value!==pw1.value?'Les mots de passe ne correspondent pas.':'');
go(0);

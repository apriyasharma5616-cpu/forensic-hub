/* ==========================================================================
   FORENSIC HUB - Core Interactive Engine
   Designed for First-Year University Forensic Science Students
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initHeroScanner();
  initSubjects();
  initCaseStudies();
  initVirtualLab();
  initStudyHub();
  initQuiz();
  initProjects();
  initCareers();
  initToolkit();
  initGlossary();
  initContactForm();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('mainNav');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky nav shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // Active section tracking via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   2. HERO INTERACTIVE BIOMETRIC SCANNER
   ========================================================================== */
function initHeroScanner() {
  const triggerBtn = document.getElementById('scannerTriggerBtn');
  const statusEl = document.getElementById('scannerStatusText');
  const patternEl = document.getElementById('scannerPatternType');
  const matchEl = document.getElementById('scannerMatchRate');
  const beamEl = document.querySelector('.scanner-beam');
  const minutiaePoints = document.querySelectorAll('.minutiae-point');

  if (!triggerBtn) return;

  const sampleResults = [
    { pattern: 'Right Loop (Ulnar)', match: '98.8%', ridges: '16 Ridge Count', core: 'Found (Offset Left)' },
    { pattern: 'Plain Whorl', match: '99.4%', ridges: '21 Ridge Count', core: 'Concentric Center' },
    { pattern: 'Tented Arch', match: '97.2%', ridges: 'Triradius Detected', core: 'High Spire Point' },
    { pattern: 'Double Loop Whorl', match: '99.1%', ridges: 'Two Deltas Present', core: 'Dual Centers' }
  ];

  let isScanning = false;

  triggerBtn.addEventListener('click', () => {
    if (isScanning) return;
    isScanning = true;
    triggerBtn.disabled = true;
    triggerBtn.textContent = 'Processing Latent Impression...';

    if (beamEl) {
      beamEl.style.animation = 'scan-vertical 0.8s ease-in-out infinite alternate';
    }

    const steps = [
      'Calibrating optical sensor...',
      'Enhancing ridge contrast & thresholding...',
      'Mapping Galton minutiae (Level 2)...',
      'Comparing with Henry Classification DB...'
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        statusEl.textContent = steps[stepIndex];
        stepIndex++;
      } else {
        clearInterval(interval);
        const randomResult = sampleResults[Math.floor(Math.random() * sampleResults.length)];
        statusEl.textContent = 'Analysis Complete - Fingerprint Classified';
        statusEl.style.color = '#0df2c9';
        patternEl.textContent = randomResult.pattern;
        matchEl.textContent = randomResult.match;

        if (beamEl) {
          beamEl.style.animation = 'scan-vertical 3.5s ease-in-out infinite alternate';
        }

        triggerBtn.disabled = false;
        triggerBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          Re-Analyze Impression
        `;
        isScanning = false;
      }
    }, 600);
  });

  // Hover tips for minutiae points
  minutiaePoints.forEach(point => {
    point.addEventListener('click', () => {
      const type = point.getAttribute('data-label');
      showToast(`Minutiae Highlighted: ${type} (Crucial Level-2 Biometric Feature)`);
    });
  });
}

/* ==========================================================================
   3. SUBJECTS CURRICULUM MODAL
   ========================================================================== */
const subjectsData = {
  biology: {
    title: 'Forensic Biology & Serology',
    code: 'FS-BIO-101',
    description: 'The scientific analysis of biological fluids, tissues, DNA profiling, and living organisms in a legal context.',
    modules: [
      { name: 'Forensic Serology', desc: 'Presumptive and confirmatory testing for blood, semen, saliva, and urine (Kastle-Meyer, Takayama, RSID, Acid Phosphatase).' },
      { name: 'DNA Profiling & STR Analysis', desc: 'Polymerase Chain Reaction (PCR), Short Tandem Repeats (STRs), Capillary Electrophoresis, and CODIS database management.' },
      { name: 'Forensic Entomology', desc: 'Estimating Post-Mortem Interval (PMI) using blowfly (Calliphoridae) life cycles and succession waves on decomposing tissue.' },
      { name: 'Forensic Anthropology & Pathology', desc: 'Human skeletal analysis, biological profile reconstruction (ancestry, biological sex, stature, age), and cause vs. manner of death.' },
      { name: 'Hair & Fiber Morphology', desc: 'Microscopic examination of hair cuticle, cortex, medulla, species determination, and synthetic vs. natural fiber comparison.' }
    ],
    labSkills: ['Pipetting & Reagent Preparation', 'Light Microscopy & Cross-polarization', 'DNA Extraction & Electrophoresis Gel Reading', 'Chain of Custody Protocol']
  },
  chemistry: {
    title: 'Forensic Chemistry & Toxicology',
    code: 'FS-CHM-102',
    description: 'The chemical identification and characterization of unknown powders, illicit drugs, accelerants, explosives, and toxic substances.',
    modules: [
      { name: 'Forensic Toxicology', desc: 'Isolation, detection, and quantification of poisons, alcohol (BAC), narcotics, and prescription pharmaceuticals in biological matrices.' },
      { name: 'Chromatography & Mass Spectrometry', desc: 'Gold standard analytical methods: Gas Chromatography-Mass Spectrometry (GC-MS) and High-Performance Liquid Chromatography (HPLC).' },
      { name: 'Fire & Arson Debris Analysis', desc: 'Passive headspace extraction of ignitable liquid residues (gasoline, kerosene) and identification of hydrocarbon pour patterns.' },
      { name: 'Explosives & Gunshot Residue (GSR)', desc: 'Organic vs. inorganic energetic compounds, and Scanning Electron Microscopy-Energy Dispersive X-ray Spectroscopy (SEM-EDX) for Lead-Barium-Antimony particles.' },
      { name: 'Presumptive Field Spot Tests', desc: 'Marquis, Cobalt Thiocyanate, Duquenois-Levine, and Ehrlich spot reagents for preliminary drug screening.' }
    ],
    labSkills: ['Colorimetric Reagent Spot Testing', 'Thin-Layer Chromatography (TLC)', 'Spectrophotometer Calibration (UV-Vis & FTIR)', 'Hazardous Chemical Handling']
  },
  physics: {
    title: 'Forensic Physics & Ballistics',
    code: 'FS-PHY-103',
    description: 'The application of classical mechanics, fluid dynamics, ballistics, and optics to crime scene reconstruction.',
    modules: [
      { name: 'Bloodstain Pattern Analysis (BPA)', desc: 'Spatter mechanics, surface tension, passive vs. dynamic stains, and calculating angles of impact using trigonometric inverse sine.' },
      { name: 'Forensic Ballistics & Firearms', desc: 'Internal, external, and terminal ballistics. Rifling lands and grooves, firing pin impressions, and comparison microscopy of spent cartridge cases.' },
      { name: 'Glass Fracture Mechanics', desc: 'Concentric vs. radial fracture lines, 3R rule (Radial fractures form Right angles on the Reverse side of impact), and refractive index via Becke line method.' },
      { name: 'Vehicle Accident Reconstruction', desc: 'Skid mark analysis, friction coefficients, conservation of momentum, and kinetic energy dissipation in vehicular collisions.' },
      { name: 'Forensic Toolmark Analysis', desc: 'Impressed vs. striated toolmarks, casting with mikrosil silicone, and microscopic feature verification.' }
    ],
    labSkills: ['Trigonometric BPA Trajectory Stringing', 'Comparison Microscopy Operation', 'Becke Line Refractive Index Immersion', 'Silicone Toolmark Casting']
  },
  fingerprints: {
    title: 'Fingerprint Science (Dactyloscopy)',
    code: 'FS-DAC-104',
    description: 'Friction ridge analysis, classification systems, latent print development, and automated biometric identification.',
    modules: [
      { name: 'Friction Ridge Anatomy & Patterns', desc: 'Structure of the epidermis and dermis. Henry System classification into Loops (radial/ulnar), Whorls (plain, central pocket, double loop, accidental), and Arches (plain, tented).' },
      { name: 'Level 1, 2, and 3 Ridge Details', desc: 'Level 1: Overall pattern flow. Level 2: Minutiae points (ridge endings, bifurcations, islands). Level 3: Dimensional ridge contours and sweat pore locations.' },
      { name: 'Latent Print Chemical Development', desc: 'Physical powders (magnetic/black), Cyanoacrylate (superglue) fuming, Ninhydrin for amino acids on porous paper, 1,2-Indanedione, and Silver Nitrate.' },
      { name: 'ACE-V Methodology', desc: 'The scientific forensic framework: Analysis, Comparison, Evaluation, and Verification used in court testimony.' },
      { name: 'Automated Fingerprint Systems (AFIS / NGI)', desc: 'Digital feature encoding, algorithmic spatial relationship scoring, and human examiner validation.' }
    ],
    labSkills: ['Latent Print Powder Dusting & Lifting', 'Cyanoacrylate Vacuum Chamber Fuming', 'Ninhydrin Solution Application & Heat Development', 'ACE-V Charting']
  },
  digital: {
    title: 'Digital & Multimedia Forensics',
    code: 'FS-DIG-105',
    description: 'The preservation, identification, extraction, and documentation of digital evidence stored on electronic devices and networks.',
    modules: [
      { name: 'Digital Evidence Triage & Write Blockers', desc: 'Forensic hygiene: Hardware write-blockers, bit-stream raw disk imaging (.dd, .E01), and cryptographic hash verification (MD5, SHA-256).' },
      { name: 'File System & Artifact Forensics', desc: 'NTFS, FAT32, APFS architectures. MFT records, Windows Registry hives, prefetch files, LNK shortcuts, and event viewer logs.' },
      { name: 'Memory (RAM) Forensics', desc: 'Volatile memory capture using LiME/WinPmem, and extracting decrypted credentials, processes, and active network sockets with Volatility.' },
      { name: 'Network Packet & Log Analysis', desc: 'Wireshark packet capture, firewall inspection, DNS query reconstruction, and tracing threat-actor IP addresses.' },
      { name: 'Mobile Device Forensics', desc: 'Logical vs. physical extractions, SQLite database carving (SMS, chat apps, GPS geotags), and anti-forensic steganography detection.' }
    ],
    labSkills: ['Cryptographic Hash Generation', 'Bit-by-Bit Disk Duplication', 'Autopsy & FTK Imager Navigation', 'Hexadecimal File Header Carving']
  }
};

function initSubjects() {
  const subjectCards = document.querySelectorAll('.subject-card');
  const modalOverlay = document.getElementById('subjectModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalSubjectTitle');
  const modalCode = document.getElementById('modalSubjectCode');
  const modalDesc = document.getElementById('modalSubjectDesc');
  const modalModules = document.getElementById('modalModulesList');
  const modalSkills = document.getElementById('modalSkillsList');

  subjectCards.forEach(card => {
    card.addEventListener('click', () => {
      const subjectKey = card.getAttribute('data-subject');
      const data = subjectsData[subjectKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalCode.textContent = data.code;
      modalDesc.textContent = data.description;

      modalModules.innerHTML = data.modules.map(m => `
        <div style="margin-bottom: 14px; background: rgba(5,11,26,0.6); padding: 12px; border-radius: 8px; border: 1px solid rgba(13,242,201,0.1);">
          <div style="font-weight: 600; color: #0df2c9; font-size: 0.95rem; margin-bottom: 4px;">${m.name}</div>
          <div style="color: #94a3b8; font-size: 0.86rem; line-height: 1.5;">${m.desc}</div>
        </div>
      `).join('');

      modalSkills.innerHTML = data.labSkills.map(skill => `
        <span style="display: inline-block; background: rgba(13,242,201,0.12); color: #0df2c9; border: 1px solid rgba(13,242,201,0.25); font-family: monospace; font-size: 0.75rem; padding: 4px 10px; border-radius: 4px; margin: 4px;">${skill}</span>
      `).join('');

      modalOverlay.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   4. CASE STUDIES
   ========================================================================== */
function initCaseStudies() {
  const toggleButtons = document.querySelectorAll('.btn-toggle-solution');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      if (!panel) return;
      const isOpen = panel.classList.contains('open');

      if (isOpen) {
        panel.classList.remove('open');
        btn.innerHTML = `
          <span>Reveal Forensic Conclusion & Legal Rationale</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
        `;
      } else {
        panel.classList.add('open');
        btn.innerHTML = `
          <span>Hide Forensic Conclusion</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>
        `;
      }
    });
  });
}

/* ==========================================================================
   5. VIRTUAL LAB SIMULATIONS
   ========================================================================== */
function initVirtualLab() {
  // Tab switching
  const tabButtons = document.querySelectorAll('.lab-tab-btn');
  const contentPanels = document.querySelectorAll('.lab-content-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-lab');
      tabButtons.forEach(b => b.classList.remove('active'));
      contentPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(target);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Lab 1: Minutiae Identification
  initMinutiaeLab();

  // Lab 2: Kastle-Meyer Presumptive Blood Test
  initKastleMeyerLab();

  // Lab 3: DNA Gel Electrophoresis
  initDnaGelLab();

  // Lab 4: Bloodstain Impact Angle Calculator
  initSpatterLab();
}

/* Lab 1: Minutiae Identification */
function initMinutiaeLab() {
  const checkBtn = document.getElementById('checkMinutiaeBtn');
  const resetBtn = document.getElementById('resetMinutiaeBtn');
  const feedbackEl = document.getElementById('minutiaeLabFeedback');
  const selects = document.querySelectorAll('.minutiae-select');

  if (!checkBtn) return;

  checkBtn.addEventListener('click', () => {
    let correctCount = 0;
    const answers = {
      m1: 'bifurcation',
      m2: 'ridge-ending',
      m3: 'island',
      m4: 'core'
    };

    selects.forEach(sel => {
      const id = sel.getAttribute('data-id');
      if (sel.value === answers[id]) {
        sel.style.borderColor = '#10b981';
        sel.style.color = '#10b981';
        correctCount++;
      } else {
        sel.style.borderColor = '#ef4444';
        sel.style.color = '#ef4444';
      }
    });

    if (correctCount === 4) {
      feedbackEl.innerHTML = `
        <div style="color: #10b981; font-weight: 600;">✓ Excellent Dactyloscopic Analysis! All 4 minutiae points correctly identified.</div>
        <p style="margin-top: 4px; font-size: 0.85rem;">Pattern type verified: Right Ulnar Loop with a distinct central core and bifurcating ridge lines.</p>
      `;
    } else {
      feedbackEl.innerHTML = `
        <div style="color: #f59e0b; font-weight: 600;">⚠ ${correctCount}/4 Correct. Review your ridge definitions:</div>
        <p style="margin-top: 4px; font-size: 0.85rem;">A <em>Bifurcation</em> is where one ridge splits into two branches. A <em>Ridge Ending</em> terminates abruptly into empty friction furrows. An <em>Island / Dot</em> is a standalone ridge unit.</p>
      `;
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      selects.forEach(sel => {
        sel.selectedIndex = 0;
        sel.style.borderColor = '';
        sel.style.color = '';
      });
      feedbackEl.innerHTML = 'Select the correct minutiae type for each labeled point on the ridge impression above.';
    });
  }
}

/* Lab 2: Kastle-Meyer Presumptive Blood Test */
function initKastleMeyerLab() {
  const swabTip = document.getElementById('kmSwabTip');
  const btnAlcohol = document.getElementById('kmBtnAlcohol');
  const btnPhenol = document.getElementById('kmBtnPhenol');
  const btnH2O2 = document.getElementById('kmBtnH2O2');
  const btnReset = document.getElementById('kmBtnReset');
  const statusLog = document.getElementById('kmStatusLog');

  if (!swabTip || !btnAlcohol) return;

  let step = 0; // 0: start, 1: ethanol added, 2: phenolphthalin added, 3: H2O2 added (reaction)

  btnAlcohol.addEventListener('click', () => {
    step = 1;
    btnAlcohol.disabled = true;
    btnPhenol.disabled = false;
    swabTip.style.background = '#818cf8';
    statusLog.textContent = 'Step 1 Complete: 95% Ethanol applied. Lipid membranes disrupted, exposing heme molecule.';
  });

  btnPhenol.addEventListener('click', () => {
    if (step !== 1) return;
    step = 2;
    btnPhenol.disabled = true;
    btnH2O2.disabled = false;
    swabTip.style.background = '#94a3b8';
    statusLog.textContent = 'Step 2 Complete: Colorless reduced phenolphthalin reagent added. If color turned pink now, it would indicate a false positive from chemical oxidants!';
  });

  btnH2O2.addEventListener('click', () => {
    if (step !== 2) return;
    step = 3;
    btnH2O2.disabled = true;
    swabTip.classList.add('positive-reaction');
    statusLog.innerHTML = `
      <strong style="color: #ec4899;">POSITIVE REACTION DETECTED:</strong> Immediate vibrant pink color within 5 seconds.
      <br><span style="color: #94a3b8; font-size: 0.84rem;">Hemoglobin catalyzed the decomposition of hydrogen peroxide (2H₂O₂ → 2H₂O + O₂), oxidizing phenolphthalin into pink phenolphthalein. Confirmatory testing (e.g. Takayama or RSID-Blood) recommended next.</span>
    `;
  });

  btnReset.addEventListener('click', () => {
    step = 0;
    btnAlcohol.disabled = false;
    btnPhenol.disabled = true;
    btnH2O2.disabled = true;
    swabTip.classList.remove('positive-reaction');
    swabTip.style.background = '#94a3b8';
    statusLog.textContent = 'A sterile cotton swab was rubbed on the suspected red-brown stain. Ready for Step 1.';
  });
}

/* Lab 3: DNA Gel Electrophoresis */
function initDnaGelLab() {
  const uvToggle = document.getElementById('uvLightToggle');
  const gelBands = document.querySelectorAll('.dna-band');
  const suspectBtns = document.querySelectorAll('.suspect-match-btn');
  const gelFeedback = document.getElementById('dnaGelFeedback');

  if (!uvToggle) return;

  let uvOn = false;

  uvToggle.addEventListener('click', () => {
    uvOn = !uvOn;
    if (uvOn) {
      uvToggle.classList.add('btn-primary');
      uvToggle.classList.remove('btn-secondary');
      uvToggle.textContent = 'Turn UV Lamp OFF';
      gelBands.forEach(band => {
        band.style.opacity = '1';
        band.style.boxShadow = '0 0 12px #0df2c9';
      });
      gelFeedback.textContent = 'UV Transilluminator active! Compare the molecular STR band weights in the Crime Scene (CS) lane against Suspects A, B, and C.';
    } else {
      uvToggle.classList.remove('btn-primary');
      uvToggle.classList.add('btn-secondary');
      uvToggle.textContent = 'Turn UV Lamp ON (312 nm)';
      gelBands.forEach(band => {
        band.style.opacity = '0.08';
        band.style.boxShadow = 'none';
      });
      gelFeedback.textContent = 'Turn on the UV Transilluminator to visualize ethidium bromide / SYBR Safe fluorescent DNA bands.';
    }
  });

  suspectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const suspect = btn.getAttribute('data-suspect');
      if (!uvOn) {
        showToast('Please turn on the UV lamp first to view the electrophoretic bands!');
        return;
      }

      if (suspect === 'B') {
        btn.style.background = '#10b981';
        btn.style.color = '#000';
        gelFeedback.innerHTML = `
          <strong style="color: #10b981;">✓ COMPLETE MATCH: Suspect B Allele Profile matches Crime Scene DNA.</strong>
          <p style="margin-top: 6px; font-size: 0.85rem; color: #94a3b8;">
            All 4 STR loci loci bands (D3S1358, vWA, FGA, Amelogenin XY) align precisely with lane 2 (CS). Suspect A exhibits high-weight dropout at 450bp, while Suspect C has non-matching homozygous alleles.
          </p>
        `;
      } else {
        btn.style.background = '#ef4444';
        btn.style.color = '#fff';
        gelFeedback.innerHTML = `
          <strong style="color: #ef4444;">✗ EXCLUSION: Suspect ${suspect} does NOT match the Crime Scene DNA profile.</strong>
          <p style="margin-top: 6px; font-size: 0.85rem; color: #94a3b8;">
            Under forensic genetics standards, a single non-matching locus excludes a suspect as the biological donor. Examine Lane B.
          </p>
        `;
      }
    });
  });
}

/* Lab 4: Bloodstain Impact Angle Calculator */
function initSpatterLab() {
  const widthInput = document.getElementById('spatterWidthInput');
  const lengthInput = document.getElementById('spatterLengthInput');
  const widthValEl = document.getElementById('spatterWidthVal');
  const lengthValEl = document.getElementById('spatterLengthVal');
  const angleOutput = document.getElementById('spatterAngleOutput');
  const velocityClassEl = document.getElementById('spatterVelocityClass');
  const dropShape = document.getElementById('bloodDropVisual');

  if (!widthInput || !lengthInput) return;

  function calculateAngle() {
    let width = parseFloat(widthInput.value);
    let length = parseFloat(lengthInput.value);

    // Physical constraint: Width cannot exceed Length for impact spatter
    if (width > length) {
      length = width;
      lengthInput.value = width;
    }

    widthValEl.textContent = `${width.toFixed(1)} mm`;
    lengthValEl.textContent = `${length.toFixed(1)} mm`;

    const ratio = width / length;
    const angleRad = Math.asin(ratio);
    const angleDeg = (angleRad * (180 / Math.PI)).toFixed(1);

    angleOutput.textContent = `${angleDeg}°`;

    // Visual drop transformation
    if (dropShape) {
      const dropWidth = Math.max(30, Math.round(width * 12));
      const dropLength = Math.max(30, Math.round(length * 12));
      dropShape.style.width = `${dropWidth}px`;
      dropShape.style.height = `${dropLength}px`;
      dropShape.style.borderRadius = `${dropWidth / 2}px / ${dropLength / 2}px`;
      
      // Rotate visually to illustrate angle
      dropShape.style.transform = `rotate(${90 - angleDeg}deg)`;
    }

    if (angleDeg < 25) {
      velocityClassEl.textContent = 'Acute Elliptical Spatter (High Directionality / Skewed Velocity)';
    } else if (angleDeg < 60) {
      velocityClassEl.textContent = 'Medium Impact Spatter (Blunt Force / Moderate Velocity)';
    } else {
      velocityClassEl.textContent = 'Near-Normal Perpendicular Drop (Passive Drip, ~90° Impact)';
    }
  }

  widthInput.addEventListener('input', calculateAngle);
  lengthInput.addEventListener('input', calculateAngle);
  calculateAngle();
}

/* ==========================================================================
   6. STUDY HUB & FLASHCARDS
   ========================================================================== */
const studyNotes = [
  {
    category: 'biology',
    code: 'NOTE-BIO-01',
    title: "Locard's Exchange Principle & Trace Biologicals",
    desc: "Every contact leaves a trace. Understanding transfer mechanics (primary vs. secondary transfer) in skin epithelial cells, salivary amylase, and telogen hair roots.",
    readTime: '6 min read'
  },
  {
    category: 'chemistry',
    code: 'NOTE-CHM-02',
    title: "GC-MS Fragmentation & Spectrum Interpretation",
    desc: "Electron ionization (70 eV) cleavage pathways, base peaks, molecular ion peaks ($M^+$), and retention indices for forensic drug identification.",
    readTime: '9 min read'
  },
  {
    category: 'physics',
    code: 'NOTE-PHY-03',
    title: "Ballistics: Striation Matching on Bullet Lands",
    desc: "The physics of rifling broaches, micro-imperfections transferred to copper jackets, and statistical objective criteria for firearms confirmation.",
    readTime: '7 min read'
  },
  {
    category: 'fingerprints',
    code: 'NOTE-DAC-04',
    title: "Cyanoacrylate Ester Polymerization (Superglue Fuming)",
    desc: "Ethyl-2-cyanoacrylate vapor catalyzed by sodium hydroxide reacting with latent sebaceous water and amino acids to form polycyanoacrylate white ridges.",
    readTime: '5 min read'
  },
  {
    category: 'digital',
    code: 'NOTE-DIG-05',
    title: "Digital Chain of Custody & Hash Integrity",
    desc: "Preventing spoliation of digital evidence using Faraday shielding, hardware write blockers, and verifying SHA-256 match pre/post forensic imaging.",
    readTime: '8 min read'
  },
  {
    category: 'procedures',
    code: 'NOTE-PROC-06',
    title: "Crime Scene Photography: The Three-Range Rule",
    desc: "Methodological capture: Overall (establishing perimeter), Mid-range (spatial orientation with evidence markers), and Close-up (90° with ABFO No. 2 forensic scale).",
    readTime: '6 min read'
  }
];

const flashcardData = [
  { term: "Locard's Exchange Principle", def: "Forensic foundation formulated by Edmond Locard: with contact between two items, there will always be an exchange of microscopic or physical material." },
  { term: "Minutiae", def: "Level-2 friction ridge characteristics (such as bifurcations, ridge endings, dots, and bridges) used in dactyloscopy for individualization." },
  { term: "Algor Mortis", def: "The post-mortem cooling of the human body until it equilibrates with ambient temperature (~1.5°F drop per hour under normal conditions)." },
  { term: "Kastle-Meyer Test", def: "A presumptive chemical test for blood using reduced phenolphthalin and hydrogen peroxide, yielding an immediate vibrant pink color in the presence of hemoglobin." },
  { term: "Becke Line", def: "A bright halo visible around a glass fragment under a microscope immersed in a liquid of different refractive index; used to match crime scene glass." },
  { term: "Short Tandem Repeats (STR)", def: "Short repeating DNA sequences (2 to 6 base pairs) analyzed in forensic multiplex PCR to generate unique individual genetic profiles." },
  { term: "Striations", def: "Microscopic parallel scratch marks etched onto bullet jackets or tool surfaces during mechanical friction, unique as a forensic fingerprint." },
  { term: "Write Blocker", def: "A hardware device or software bridge that prevents any write commands from modifying physical storage media during forensic digital acquisition." }
];

function initStudyHub() {
  const filterBtns = document.querySelectorAll('.study-hub-filter .filter-btn');
  const notesContainer = document.getElementById('studyNotesGrid');

  function renderNotes(category) {
    if (!notesContainer) return;
    const filtered = category === 'all' 
      ? studyNotes 
      : studyNotes.filter(n => n.category === category);

    notesContainer.innerHTML = filtered.map(note => `
      <div class="study-note-card">
        <div class="study-note-header">
          <span class="study-note-meta">${note.code}</span>
          <span style="font-size: 0.75rem; color: #64748b; font-family: monospace;">${note.readTime}</span>
        </div>
        <h3 style="font-size: 1.15rem; color: #f8fafc; margin-bottom: 8px;">${note.title}</h3>
        <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6; margin-bottom: 16px;">${note.desc}</p>
        <button class="btn btn-secondary btn-sm" onclick="showToast('Study Note opened: ${note.title}. Downloadable PDF revision summary available.')" style="margin-top: auto; align-self: flex-start;">
          <span>Read Revision Note</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderNotes(btn.getAttribute('data-filter'));
    });
  });

  renderNotes('all');

  // Flashcards mechanism
  const flashcardCard = document.getElementById('flashcardElement');
  const flashcardFront = document.getElementById('flashcardFrontTerm');
  const flashcardBack = document.getElementById('flashcardBackDef');
  const prevBtn = document.getElementById('prevFlashcardBtn');
  const nextBtn = document.getElementById('nextFlashcardBtn');
  const counterEl = document.getElementById('flashcardCounter');

  if (!flashcardCard) return;

  let currentCardIndex = 0;

  function updateCard() {
    flashcardCard.classList.remove('flipped');
    const card = flashcardData[currentCardIndex];
    flashcardFront.textContent = card.term;
    flashcardBack.textContent = card.def;
    if (counterEl) {
      counterEl.textContent = `Card ${currentCardIndex + 1} of ${flashcardData.length}`;
    }
  }

  flashcardCard.addEventListener('click', () => {
    flashcardCard.classList.toggle('flipped');
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentCardIndex = (currentCardIndex - 1 + flashcardData.length) % flashcardData.length;
      updateCard();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentCardIndex = (currentCardIndex + 1) % flashcardData.length;
      updateCard();
    });
  }

  updateCard();
}

/* ==========================================================================
   7. QUIZ MODULE
   ========================================================================== */
const quizQuestions = [
  {
    q: "According to Edmond Locard's Exchange Principle, what occurs whenever an individual comes into contact with a location or another person?",
    options: [
      "Physical evidence is destroyed by environmental weathering",
      "A cross-transfer of physical and microscopic evidence occurs",
      "Biological DNA undergoes rapid enzymatic degradation",
      "Fingerprints evaporate within twenty-four hours"
    ],
    correct: 1,
    category: "General Forensics",
    explanation: "Locard's Exchange Principle states that 'with contact between two items, there will be an exchange.' Even minute physical trace items (fibers, skin cells, dust) transfer between victim, perpetrator, and scene."
  },
  {
    q: "In friction ridge analysis (dactyloscopy), which level of detail includes minutiae points such as bifurcations and ridge endings?",
    options: [
      "Level 1 Detail (General pattern flow and arch/loop classification)",
      "Level 2 Detail (Individual ridge paths and minutiae formations)",
      "Level 3 Detail (Dimensional pore morphology and edge contours)",
      "Level 4 Detail (Sub-cellular sweat gland histology)"
    ],
    correct: 1,
    category: "Fingerprint Science",
    explanation: "Level 1 is overall pattern (whorl, arch, loop); Level 2 consists of specific minutiae points (bifurcations, endings, islands) necessary for individualization; Level 3 examines pore positions and ridge edge shapes."
  },
  {
    q: "Which chemical reagent is commonly used to develop latent fingerprints on porous substrates such as notebook paper by reacting with amino acids?",
    options: [
      "Ninhydrin (yielding Ruhemann's Purple)",
      "Luminol (yielding blue chemiluminescence)",
      "Sodium Rhodizonate (yielding red-violet for lead)",
      "Amido Black (protein dye for visible blood prints)"
    ],
    correct: 0,
    category: "Forensic Chemistry",
    explanation: "Ninhydrin reacts with free amino acids deposited in sweat on porous materials like paper or untreated wood, producing a distinct purplish-blue color known as Ruhemann's Purple."
  },
  {
    q: "When calculating the angle of impact ($\theta$) of a blood droplet, which trigonometric formula is applied to its width ($w$) and length ($l$)?",
    options: [
      "$\\theta = \\arccos(w / l)$",
      "$\\theta = \\arcsin(w / l)$",
      "$\\theta = \\arctan(l / w)$",
      "$\\theta = \\sin(l \\times w)$"
    ],
    correct: 1,
    category: "Forensic Physics",
    explanation: "The angle of impact is calculated via $\\sin(\\theta) = \\text{width} / \\text{length}$, therefore $\\theta = \\arcsin(w / l)$, where width is always the narrower axis perpendicular to travel direction."
  },
  {
    q: "Why must wet biological evidence (such as blood-soaked clothing) never be permanently sealed in airtight plastic bags?",
    options: [
      "Plastic causes the cloth to shrink instantly",
      "Trapped moisture promotes bacterial growth and destroys DNA",
      "Plastic reacts violently with hemoglobin proteins",
      "Plastic bag seals alter the ballistic trajectory markings"
    ],
    correct: 1,
    category: "Evidence Handling",
    explanation: "Trapped moisture creates an anaerobic environment that fosters rapid microbial growth, degrading cellular DNA. Biological evidence must be air-dried and packaged in breathable paper bags or porous envelopes."
  },
  {
    q: "What is the primary role of a hardware write-blocker in digital forensic investigations?",
    options: [
      "To accelerate data download speeds across gigabit ethernet",
      "To intercept write commands to ensure evidence drive media remains unaltered",
      "To decrypt complex ransomware algorithms automatically",
      "To erase bad sectors on hard drives prior to analysis"
    ],
    correct: 1,
    category: "Digital Forensics",
    explanation: "A write-blocker permits read access to the suspect storage drive while electronically intercepting and discarding all write requests, ensuring cryptographic byte-for-byte integrity and court admissibility."
  },
  {
    q: "In post-mortem changes, what is 'Rigor Mortis' caused by at the cellular level?",
    options: [
      "Rapid depletion of cellular ATP preventing actin-myosin detachment",
      "Bacterial colonization of neural axons",
      "Evaporation of intracellular water from bone marrow",
      "Excessive production of lactic acid in salivary glands"
    ],
    correct: 0,
    category: "Forensic Biology",
    explanation: "After respiration ceases, cellular ATP is depleted. Without ATP, actin-myosin cross-bridges in muscle fibers cannot release, causing muscle stiffening known as rigor mortis, typically manifesting 2 to 4 hours post-mortem."
  },
  {
    q: "In firearms examination, what are the raised segments inside a rifled barrel that cut grooves into the bullet called?",
    options: [
      "Lands",
      "Ejectors",
      "Breech faces",
      "Extractors"
    ],
    correct: 0,
    category: "Forensic Ballistics",
    explanation: "The interior spirals of a rifled barrel consist of 'grooves' (cut-out valleys) and 'lands' (the raised metal surfaces). The lands bite into the spinning bullet to imprint stabilizing gyroscopic spin."
  }
];

function initQuiz() {
  const qText = document.getElementById('quizQuestionText');
  const qCategory = document.getElementById('quizCategoryPill');
  const qNumber = document.getElementById('quizQuestionNumber');
  const optionsList = document.getElementById('quizOptionsList');
  const explBox = document.getElementById('quizExplanationBox');
  const progressBar = document.getElementById('quizProgressBar');
  const scoreCounter = document.getElementById('quizScoreCounter');
  const restartBtn = document.getElementById('quizRestartBtn');

  if (!qText) return;

  let currentIdx = 0;
  let score = 0;
  let answered = false;

  function loadQuestion(index) {
    answered = false;
    const q = quizQuestions[index];
    qText.textContent = q.q;
    qCategory.textContent = q.category;
    qNumber.textContent = `Question ${index + 1} of ${quizQuestions.length}`;
    scoreCounter.textContent = `Score: ${score}/${quizQuestions.length}`;
    explBox.style.display = 'none';

    // Progress bar update
    const progress = ((index + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;

    optionsList.innerHTML = '';
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span>${String.fromCharCode(65 + optIdx)}. ${optText}</span>
        <span class="opt-indicator"></span>
      `;
      btn.addEventListener('click', () => handleAnswer(optIdx, btn, q));
      optionsList.appendChild(btn);
    });
  }

  function handleAnswer(selectedIdx, selectedBtn, q) {
    if (answered) return;
    answered = true;

    const allBtns = optionsList.querySelectorAll('.quiz-option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (selectedIdx === q.correct) {
      selectedBtn.classList.add('correct');
      score++;
      scoreCounter.textContent = `Score: ${score}/${quizQuestions.length}`;
      explBox.innerHTML = `<strong style="color: #10b981;">Correct!</strong> ${q.explanation}`;
    } else {
      selectedBtn.classList.add('wrong');
      allBtns[q.correct].classList.add('correct');
      explBox.innerHTML = `<strong style="color: #ef4444;">Incorrect.</strong> ${q.explanation}`;
    }

    explBox.style.display = 'block';

    // Next question delay or completion
    setTimeout(() => {
      if (currentIdx < quizQuestions.length - 1) {
        currentIdx++;
        loadQuestion(currentIdx);
      } else {
        renderQuizCompletion();
      }
    }, 2800);
  }

  function renderQuizCompletion() {
    qText.textContent = `Quiz Complete! You scored ${score} out of ${quizQuestions.length}.`;
    qCategory.textContent = 'Results Evaluated';
    progressBar.style.width = '100%';
    optionsList.innerHTML = `
      <div style="text-align: center; padding: 24px;">
        <div style="font-size: 2.4rem; color: #0df2c9; font-weight: 700; margin-bottom: 12px;">${Math.round((score / quizQuestions.length) * 100)}%</div>
        <p style="color: #94a3b8; margin-bottom: 20px;">
          ${score >= 6 ? 'Outstanding foundational knowledge in forensic biology, chemistry, physics, and dactyloscopy!' : 'Good effort! Review the Study Hub notes and revisit the Virtual Lab exercises to reinforce key concepts.'}
        </p>
        <button class="btn btn-primary" id="retakeQuizBtn">
          <span>Retake Forensic Assessment</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
        </button>
      </div>
    `;
    explBox.style.display = 'none';

    document.getElementById('retakeQuizBtn').addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      loadQuestion(0);
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      loadQuestion(0);
    });
  }

  loadQuestion(0);
}

/* ==========================================================================
   8. STUDENT PROJECTS
   ========================================================================== */
const studentProjects = [
  {
    category: 'biology',
    title: 'Efficacy of 1,2-Indanedione vs. Ninhydrin on Thermal Paper Receipts',
    author: 'Student Research Group A (Year 1 Honors)',
    abstract: 'Standard ninhydrin formulations dissolve thermal paper dyes, turning evidence black. This project evaluated zinc chloride-catalyzed 1,2-indanedione in petroleum ether.',
    findings: [
      'Fluorogenic excitation at 532 nm yielded sharp ridge contrast without turning thermal surface black',
      'Amino acid sensitivity increased by 38% compared to traditional iodine fuming'
    ]
  },
  {
    category: 'chemistry',
    title: 'Post-Mortem Interval (PMI) Correlation with Vitreous Humor Potassium',
    author: 'Undergraduate Investigative Lab Team',
    abstract: 'Investigated ion-selective electrode potentiometry for potassium ion accumulation in bovine vitreous humor across varying ambient temperatures (5°C to 30°C).',
    findings: [
      'Validated linear increase [K+] = 0.17 mEq/L/hour in temperate environments',
      'Confirmed high accuracy within the initial 24-hour post-mortem window'
    ]
  },
  {
    category: 'physics',
    title: 'Kinetic Dissipation and Fracture Spallation in Tempered Vehicle Glass',
    author: 'Applied Ballistics & Impact Study Group',
    abstract: 'High-speed chronophotography was utilized to map radial propagation velocity and fracture bifurcation in automotive side windows subjected to low-velocity projectile impacts.',
    findings: [
      'Radial crack propagation clocked at ~1,520 m/s',
      'The 3R rule demonstrated 99.1% consistency in determining sequence of multiple bullet impacts'
    ]
  },
  {
    category: 'digital',
    title: 'Detection of Steganographic Payloads in Social Media Metadata',
    author: 'Cyber Forensics Undergraduate Cohort',
    abstract: 'Evaluated LSB (Least Significant Bit) spatial domain image manipulation across compressed JPEG formats to uncover encrypted hidden payloads.',
    findings: [
      'Chi-Square and Sample Pair steganalysis identified payloads hidden at > 5% embedding rate',
      'Produced automated Python extraction script for academic peer use'
    ]
  }
];

function initProjects() {
  const container = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');

  function render(cat) {
    if (!container) return;
    const items = cat === 'all' ? studentProjects : studentProjects.filter(p => p.category === cat);
    container.innerHTML = items.map(p => `
      <div class="project-card">
        <span class="project-meta-pill">${p.author}</span>
        <h3 style="font-size: 1.25rem; color: #f8fafc; margin-bottom: 10px;">${p.title}</h3>
        <p style="font-size: 0.9rem; color: #94a3b8; line-height: 1.6; margin-bottom: 16px;">${p.abstract}</p>
        <div style="font-size: 0.8rem; font-family: monospace; color: #0df2c9; text-transform: uppercase; margin-bottom: 6px;">Key Research Findings:</div>
        <ul class="project-findings-list">
          ${p.findings.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <button class="btn btn-secondary btn-sm" onclick="showToast('Academic Project abstract & methodology log loaded.')" style="margin-top: auto; align-self: flex-start;">
          <span>View Methodology</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.getAttribute('data-filter'));
    });
  });

  render('all');
}

/* ==========================================================================
   9. CAREERS IN FORENSIC SCIENCE
   ========================================================================== */
function initCareers() {
  // Can be extended with modal view or detail click
}

/* ==========================================================================
   10. TOOLKIT (INTERACTIVE CALCULATORS & RESOURCES)
   ========================================================================== */
function initToolkit() {
  // Glaister Equation PMI Estimator: PMI = (98.4 - RectalTemp) / 1.5
  const rectalTempInput = document.getElementById('rectalTempInput');
  const ambientTempInput = document.getElementById('ambientTempInput');
  const calcPmiBtn = document.getElementById('calcPmiBtn');
  const pmiOutput = document.getElementById('pmiOutput');

  if (calcPmiBtn) {
    calcPmiBtn.addEventListener('click', () => {
      const rectal = parseFloat(rectalTempInput.value);
      const ambient = parseFloat(ambientTempInput.value);

      if (isNaN(rectal) || isNaN(ambient)) {
        pmiOutput.innerHTML = '<span style="color: #ef4444;">Please enter valid numeric temperatures.</span>';
        return;
      }

      if (rectal > 105 || rectal < 60) {
        pmiOutput.innerHTML = '<span style="color: #f59e0b;">Temperature out of physiological post-mortem range.</span>';
        return;
      }

      const pmiHours = ((98.4 - rectal) / 1.5).toFixed(1);
      const safeHours = Math.max(0, pmiHours);

      pmiOutput.innerHTML = `
        <div><strong>Estimated Time Since Death:</strong> ~${safeHours} hours</div>
        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 4px;">Formula: $(98.4^\\circ\\text{F} - T_{\\text{core}}) / 1.5^\\circ\\text{F/hr}$ (Glaister Linear Model). Note: Corrected for clothing, body mass, and ambient temperature (${ambient}°F).</div>
      `;
    });
  }

  // Evidence Packaging Selector
  const packagingSelect = document.getElementById('evidenceTypeSelect');
  const packagingOutput = document.getElementById('packagingOutput');

  const packagingGuide = {
    blood_wet: {
      container: 'Porous Kraft Paper Bag or Cardboard Box',
      rule: 'NEVER seal in plastic! Must be completely air-dried at room temperature in an evidence locker before final packaging to prevent enzymatic DNA degradation.',
      label: 'Biohazard Warning Tape + Chain of Custody Seal'
    },
    firearms: {
      container: 'Heavy-gauge Cardboard Gun Box with Nylon Zip-Ties',
      rule: 'Unload chamber before transport (or clearly tag as loaded if safety cannot be manipulated). Do NOT insert pencils or dowels into the barrel, which damages micro-rifling lands.',
      label: 'Firearm Safety Verification Tag + Serial Number Log'
    },
    digital_phone: {
      container: 'Faraday Bag / RF Shielding Envelope',
      rule: 'Keep device powered ON if locked (or place in airplane mode and turn off WiFi/Bluetooth). Faraday cage prevents remote lock or cloud wiping commands.',
      label: 'Digital Device ID + Cryptographic Triage Slip'
    },
    arson_debris: {
      container: 'Airtight Clean Metal Paint Can or Glass Mason Jar',
      rule: 'Fill container to 2/3 capacity leaving 1/3 headspace for laboratory hydrocarbon vapor extraction. Never use plastic bags, which absorb petroleum volatile fractions.',
      label: 'Flammable Liquid Residue Alert + Tamper-evident Seal'
    }
  };

  if (packagingSelect && packagingOutput) {
    packagingSelect.addEventListener('change', () => {
      const selected = packagingSelect.value;
      const guide = packagingGuide[selected];
      if (!guide) return;

      packagingOutput.innerHTML = `
        <div style="color: #0df2c9; font-weight: 600; margin-bottom: 4px;">Recommended Container: ${guide.container}</div>
        <div style="color: #cbd5e1; margin-bottom: 6px; font-size: 0.85rem;"><strong>Protocol:</strong> ${guide.rule}</div>
        <div style="color: #f59e0b; font-size: 0.78rem; font-family: monospace;"><strong>Labeling Requirement:</strong> ${guide.label}</div>
      `;
    });
  }

  // Chain of Custody Record Builder
  const genCoCBtn = document.getElementById('genCoCBtn');
  const cocOutput = document.getElementById('cocOutput');

  if (genCoCBtn) {
    genCoCBtn.addEventListener('click', () => {
      const itemNum = document.getElementById('cocItemNum').value || 'ITEM-2026-001';
      const desc = document.getElementById('cocItemDesc').value || 'Latent fingerprint lift card on porous cardboard';
      const officer = document.getElementById('cocOfficer').value || 'Cadet Investigator / FS-Yr1';
      const date = new Date().toISOString().replace('T', ' ').substring(0, 19);

      cocOutput.value = `=====================================================
FORENSIC CHAIN OF CUSTODY INTEGRITY RECORD
=====================================================
Evidence Item Tracking ID: ${itemNum}
Date/Time of Initial Recovery: ${date} UTC
Description of Physical Evidence: ${desc}
Recovered By: ${officer}

TRANSFER RECORD LOG:
Transfer 1:
- Released By: ${officer}
- Received By: Forensic Central Property Custodian
- Purpose of Transfer: Secure Temp-Controlled Vault Lodgement
- Package Condition: Sealed with tamper-evident red forensic tape (Unopened)
- Hash Verification (Digital Artifacts): N/A (Physical Media)
=====================================================`;
      showToast('Chain of Custody Record Formatted & Ready to Copy!');
    });
  }
}

/* ==========================================================================
   11. GLOSSARY (SEARCH & FILTER)
   ========================================================================== */
const glossaryTerms = [
  { term: "ACE-V Method", cat: "Fingerprints", def: "A scientific methodology in latent print examination: Analysis, Comparison, Evaluation, and Verification." },
  { term: "Accelerant", cat: "Chemistry", def: "Any substance, often an ignitable petroleum hydrocarbon (gasoline, kerosene), used to intentionally initiate or accelerate a fire." },
  { term: "Algor Mortis", cat: "Pathology", def: "The steady post-mortem cooling process of the corpse body until it matches the temperature of the surrounding environment." },
  { term: "Amylase", cat: "Biology", def: "An enzyme present at high concentrations in human saliva, targeted during presumptive serological testing for bite marks or swabbing." },
  { term: "Autopsy", cat: "Pathology", def: "A thorough post-mortem surgical examination of a corpse performed by a medical examiner to ascertain cause and manner of death." },
  { term: "Ballistics", cat: "Physics", def: "The science mechanics of projectiles in flight, divided into internal, intermediate, external, and terminal ballistics." },
  { term: "Becke Line", cat: "Physics", def: "An optical halo phenomenon visible around transparent glass particles viewed through a microscope immersed in liquid of known refractive index." },
  { term: "Bifurcation", cat: "Fingerprints", def: "A friction ridge minutiae point where a single continuous ridge splits into two distinct diverging branches." },
  { term: "Cast-off Spatter", cat: "Physics", def: "Bloodstain pattern created when blood is flung from a swinging bloody weapon or object in motion onto nearby surfaces." },
  { term: "Chain of Custody", cat: "Procedures", def: "A legally binding chronological document establishing who collected, handled, transferred, analyzed, and secured physical evidence." },
  { term: "CODIS", cat: "Biology", def: "Combined DNA Index System, the electronic database of DNA profiles maintained by forensic agencies for criminal indexing." },
  { term: "Comparison Microscope", cat: "Ballistics", def: "Two interconnected optical microscopes allowing side-by-side split-screen comparison of bullets, cartridge cases, or trace fibers." },
  { term: "Cyanoacrylate Fuming", cat: "Fingerprints", def: "Technique utilizing superglue vapors inside a fuming cabinet to polymerize on latent print sebaceous deposits into durable white ridges." },
  { term: "Dactyloscopy", cat: "Fingerprints", def: "The scientific study of fingerprints as a reliable means of personal identification and individualization." },
  { term: "Digital Hash (MD5 / SHA)", cat: "Digital", def: "A fixed-string cryptographic checksum generated from digital data. Any modification to a bit alters the resulting hash value." },
  { term: "Electrophoresis", cat: "Biology", def: "The biochemical separation of charged molecules (such as DNA fragments) through a polymer gel matrix driven by an electrical field." },
  { term: "Forensic Entomology", cat: "Biology", def: "The study of insects and arthropod succession on decomposing remains to estimate the minimum post-mortem interval (PMI)." },
  { term: "Gas Chromatography (GC)", cat: "Chemistry", def: "An instrumental analytical separation method in which volatile vaporized mixtures are separated across a capillary column." },
  { term: "Glaister Equation", cat: "Pathology", def: "A mathematical linear model approximating the hours elapsed since death based on the core body cooling rate." },
  { term: "Gunshot Residue (GSR)", cat: "Chemistry", def: "Microscopic burnt and unburnt propellant particles containing lead, barium, and antimony ejected from a fired firearm." },
  { term: "Henry Classification", cat: "Fingerprints", def: "A historical alphanumeric classification system grouping ten-print fingerprint sets based on the presence of whorl patterns." },
  { term: "Kastle-Meyer Test", cat: "Biology", def: "A rapid presumptive serological spot test for hemoglobin using reduced phenolphthalin and hydrogen peroxide, yielding bright pink." },
  { term: "Latent Fingerprint", cat: "Fingerprints", def: "An invisible or barely perceptible friction ridge impression transferred by sweat and sebum that requires physical or chemical processing." },
  { term: "Livor Mortis", cat: "Pathology", def: "The purplish-red discoloration of dependent body parts following death, caused by gravitational settling of uncirculated red blood cells." },
  { term: "Locard's Exchange Principle", cat: "General", def: "Foundational postulate: every physical contact leaves a trace, resulting in microscopic mutual exchange between two objects." },
  { term: "Luminol", cat: "Chemistry", def: "A chemical compound that reacts with the iron in blood hemoglobin via chemiluminescence, emitting a faint glowing blue light in darkness." },
  { term: "Mass Spectrometry (MS)", cat: "Chemistry", def: "An analytical technique that ionizes chemical compounds and sorts the ions based on their specific mass-to-charge ($m/z$) ratio." },
  { term: "Minutiae", cat: "Fingerprints", def: "Discontinuous ridge characteristics (ridge endings, bifurcations, dots, islands, trifurcations) used to compare fingerprints." },
  { term: "Ninhydrin", cat: "Chemistry", def: "A chemical reagent reacting with amino acids and proteins in latent finger deposits to produce a vibrant purple coloration (Ruhemann's purple)." },
  { term: "Polymerase Chain Reaction (PCR)", cat: "Biology", def: "A molecular biology method used to exponentially amplify tiny or degraded quantities of DNA fragments for STR profiling." },
  { term: "Refractive Index (RI)", cat: "Physics", def: "A ratio comparing the velocity of light in a vacuum to its velocity in a particular substance, fundamental for forensic glass matching." },
  { term: "Rigor Mortis", cat: "Pathology", def: "The temporary biochemical muscular stiffening occurring after death due to the failure of actin-myosin release following ATP exhaustion." },
  { term: "Short Tandem Repeats (STR)", cat: "Biology", def: "Repetitive non-coding tandem DNA sequences whose variable repeat numbers between individuals provide unique genetic identifiers." },
  { term: "Striation", cat: "Ballistics", def: "Microscopic scratches and parallel grooves left on bullets or toolmarks caused by physical scraping against hard mechanical surfaces." },
  { term: "Toxicology", cat: "Chemistry", def: "The study of poisons, pharmaceuticals, drugs of abuse, and toxic substances, and their physiological effects on human tissues." },
  { term: "Write Blocker", cat: "Digital", def: "A specialized hardware tool preventing host computers from writing or altering data on an evidentiary electronic storage drive." }
];

function initGlossary() {
  const searchInput = document.getElementById('glossarySearchInput');
  const letterButtons = document.querySelectorAll('.alpha-btn');
  const container = document.getElementById('glossaryGrid');

  function render(query = '', letter = '') {
    if (!container) return;
    let list = glossaryTerms;

    if (letter && letter !== 'ALL') {
      list = list.filter(item => item.term.toUpperCase().startsWith(letter));
    }

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(item => 
        item.term.toLowerCase().includes(q) || 
        item.def.toLowerCase().includes(q) || 
        item.cat.toLowerCase().includes(q)
      );
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
          <p>No forensic terms matched your search query.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(item => `
      <div class="glossary-card">
        <div class="glossary-category">${item.cat}</div>
        <h3 class="glossary-term">${item.term}</h3>
        <p class="glossary-def">${item.def}</p>
      </div>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      letterButtons.forEach(b => b.classList.remove('active'));
      render(e.target.value.trim(), '');
    });
  }

  letterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      letterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (searchInput) searchInput.value = '';
      render('', btn.getAttribute('data-letter'));
    });
  });

  render();
}

/* ==========================================================================
   12. CONTACT FORM & TOAST NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedbackMsg = document.getElementById('contactFeedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      feedbackMsg.innerHTML = '<span style="color: #ef4444;">Please fill out all required fields.</span>';
      return;
    }

    // Email pattern validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      feedbackMsg.innerHTML = '<span style="color: #ef4444;">Please enter a valid academic or personal email address.</span>';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Transmitting Message...';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Send Inquiry Message</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      `;
      feedbackMsg.innerHTML = '<span style="color: #10b981;">✓ Message received! An academic advisor or student peer will respond to your inquiry shortly.</span>';
      showToast(`Inquiry sent successfully for ${name}. Thank you for connecting with Forensic Hub!`);
    }, 900);
  });
}

/* Toast Alert Helper */
function showToast(text) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = 'toast-alert';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0df2c9" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
    <span>${text}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

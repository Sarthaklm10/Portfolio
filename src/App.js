  import React, { useState, useRef, useEffect } from 'react';
  import './App.css';
  import profileImg from './assets/profileImg.jpg';
  import { FaReact, FaCss3Alt } from 'react-icons/fa';
  import { SiJavascript } from 'react-icons/si';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  // Skill data
  const skillGroups = [
    {
      title: 'Front-End Development',
      skills: [
        { name: 'HTML5', percent: 85, color: '#e44d26', icon: <i className="devicon-html5-plain colored" /> },
        { name: 'CSS3', percent: 80, color: '#2965f1', icon: <i className="devicon-css3-plain colored" /> },
        { name: 'SASS', percent: 75, color: '#cc6699', icon: <i className="devicon-sass-original colored" /> },
        { name: 'JavaScript (ES6+)', percent: 82, color: '#f7df1e', icon: <SiJavascript size={24} color="#f7df1e" /> },
        { name: 'React.js', percent: 70, color: '#61dafb', icon: <FaReact size={24} color="#61dafb" /> },
        { name: 'Git', percent: 78, color: '#f34f29', icon: <i className="devicon-git-plain colored" /> },
      ],
    },
    {
      title: 'Back-End Development',
      skills: [
        { name: 'Node.js', percent: 65, color: '#3c873a', icon: <i className="devicon-nodejs-plain colored" /> },
        { name: 'Express.js', percent: 60, color: '#000', icon: <i className="devicon-express-original colored" /> },
        { name: 'MongoDB', percent: 62, color: '#4db33d', icon: <i className="devicon-mongodb-plain colored" /> },
      ],
    },
    {
      title: 'Data Structures & Algorithms',
      skills: [
        { name: 'Arrays', percent: 80, color: '#a3cef1', icon: <i className="devicon-cplusplus-plain colored" /> },
        { name: 'Linked Lists', percent: 75, color: '#f3c583', icon: <i className="devicon-cplusplus-plain colored" /> },
        { name: 'Stacks & Queues', percent: 72, color: '#6c63ff', icon: <i className="devicon-cplusplus-plain colored" /> },
        { name: 'Trees', percent: 68, color: '#4db33d', icon: <i className="devicon-cplusplus-plain colored" /> },
        { name: 'Graphs', percent: 65, color: '#e44d26', icon: <i className="devicon-cplusplus-plain colored" /> },
        { name: 'Dynamic Programming', percent: 60, color: '#cc6699', icon: <i className="devicon-cplusplus-plain colored" /> },
      ],
    },
  ];

  function App() {
    const [theme, setTheme] = useState('light');
    const [loading, setLoading] = useState(true);
    const overlayRef = useRef();
    const sectionRefs = useRef({});
    const navBtnRefs = useRef([]);
    const projectCardRefs = useRef([]);
    const linkRefs = useRef([]);
    const mainHeaderRef = useRef();

    useEffect(() => {
      // Loading spinner fade out
      if (!loading) {
        gsap.to('.gsap-loader', { opacity: 0, duration: 0.6, onComplete: () => {
          const loader = document.querySelector('.gsap-loader');
          if (loader) loader.style.display = 'none';
        }});
      }
    }, [loading]);

    useEffect(() => {
      // Section scroll animations
      Object.values(sectionRefs.current).forEach((ref, idx) => {
        if (ref) {
          gsap.fromTo(ref, {
            opacity: 0,
            y: 40,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.1 + idx * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
      // Project card scroll-in
      projectCardRefs.current.forEach((ref, idx) => {
        if (ref) {
          gsap.fromTo(ref, {
            opacity: 0,
            scale: 0.95,
          }, {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: 0.2 + idx * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
      // Main header text animation
      if (mainHeaderRef.current) {
        gsap.fromTo(mainHeaderRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.95,
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
        });
      }
      // Nav button hover
      navBtnRefs.current.forEach((btn) => {
        if (btn) {
          btn.onmouseenter = () => {
            gsap.to(btn, { scale: 1.08, color: 'var(--primary)', textShadow: '0 2px 8px var(--accent)', duration: 0.18 });
          };
          btn.onmouseleave = () => {
            gsap.to(btn, { scale: 1, color: 'var(--nav-text)', textShadow: 'none', duration: 0.18 });
          };
        }
      });
      // Project card hover
      projectCardRefs.current.forEach((card) => {
        if (card) {
          card.onmouseenter = () => {
            gsap.to(card, { scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.13)', duration: 0.18 });
          };
          card.onmouseleave = () => {
            gsap.to(card, { scale: 1, boxShadow: 'var(--card-shadow)', duration: 0.18 });
          };
        }
      });
      // Link hover
      linkRefs.current.forEach((link) => {
        if (link) {
          link.onmouseenter = () => {
            gsap.to(link, { color: 'var(--accent)', textDecoration: 'underline', duration: 0.18 });
          };
          link.onmouseleave = () => {
            gsap.to(link, { color: 'var(--primary)', textDecoration: 'none', duration: 0.18 });
          };
        }
      });

      // Animate skill bars and items
      projectCardRefs.current && Object.values(projectCardRefs.current).forEach((ref, idx) => {
        if (ref && ref.classList.contains('gsap-skill-item')) {
          gsap.fromTo(ref, {
            opacity: 0,
            y: 30,
            boxShadow: 'none',
            scale: 0.98,
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            duration: 0.7,
            delay: 0.1 + idx * 0.07,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            onStart: () => {
              const bar = ref.querySelector('.skill-level');
              if (bar) {
                gsap.to(bar, { width: bar.dataset.percent + '%', background: 'var(--skill-color)', duration: 1, ease: 'power2.out' });
              }
            }
          });
          // Hover effect
          ref.onmouseenter = () => {
            gsap.to(ref, { boxShadow: '0 4px 24px var(--skill-color)', scale: 1.04, duration: 0.18 });
          };
          ref.onmouseleave = () => {
            gsap.to(ref, { boxShadow: '0 2px 16px rgba(0,0,0,0.07)', scale: 1, duration: 0.18 });
          };
        }
      });
    }, [loading, theme]);

    // Theme switching animation
    const handleThemeToggle = () => {
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0, pointerEvents: 'none' }, { opacity: 1, pointerEvents: 'all', duration: 0.3, onComplete: () => {
          setTheme(theme === 'light' ? 'dark' : 'light');
          gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
        }});
      } else {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }
    };

    useEffect(() => {
      // Simulate loading
      const timer = setTimeout(() => setLoading(false), 1200);
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const scrollToSection = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <div className="PortfolioApp">
        {loading && (
          <div className="gsap-loader">
            <div className="gsap-spinner"></div>
          </div>
        )}
        <div className="theme-overlay" ref={overlayRef}></div>
        <nav className="navbar">
          <div className="nav-logo">MyPortfolio</div>
          <ul className="nav-links">
            {sections.map((section, idx) => (
              <li key={section.id}>
                <button ref={el => navBtnRefs.current[idx] = el} onClick={() => scrollToSection(section.id)}>{section.label}</button>
              </li>
            ))}
          </ul>
          <button className="theme-toggle" onClick={handleThemeToggle} aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </nav>
        <main>
          <section id="home" className="section home-section" ref={el => sectionRefs.current['home'] = el}>
            <h1 ref={mainHeaderRef}>Hello, I'm Sarthak Baluni</h1>
            <p className="subtitle">A passionate web developer.</p>
          </section>
          <section id="about" className="section about-section" ref={el => sectionRefs.current['about'] = el}>
            <img src={profileImg} alt="Profile" className="profile-pic" />
            <div>
              <h2>About Me</h2>
              <p>
                Hi! I'm Sarthak Baluni, a college student currently enjoying the journey of learning and building websites. I love designing and developing interactive, smooth user experiences using front-end technologies like React and JavaScript. I'm constantly exploring new technologies and growing my skills as a web developer. Always excited about learning and taking on new challenges!
              </p>
            </div>
          </section>
          <section id="skills" className="section skills-section" ref={el => sectionRefs.current['skills'] = el}>
            <h2>Skills</h2>
            <div className="skills-groups">
              {skillGroups.map((group, gIdx) => (
                <div className="skills-group" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="skills-list">
                    {group.skills.map((skill, idx) => (
                      <div
                        className="skill gsap-skill-item"
                        key={skill.name}
                        ref={el => {
                          if (!projectCardRefs.current) projectCardRefs.current = [];
                          projectCardRefs.current[`skill-${gIdx}-${idx}`] = el;
                        }}
                        style={{'--skill-color': skill.color}}
                      >
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                        <div className="skill-bar">
                          <div className="skill-level" style={{ width: 0 }} data-percent={skill.percent}></div>
                          <span className="skill-percent">{skill.percent}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* <section id="projects" className="section projects-section" ref={el => sectionRefs.current['projects'] = el}>
            <h2>Projects</h2>
            <div className="projects-list">
              <div className="project-card" ref={el => projectCardRefs.current[0] = el}>
                <img src="https://via.placeholder.com/300x180" alt="Project 1" />
                <div className="project-info">
                  <h3>Project Title</h3>
                  <p>Short project description goes here.</p>
                  <a href="#" target="_blank" rel="noopener noreferrer" ref={el => linkRefs.current[0] = el}>GitHub</a> |
                  <a href="#" target="_blank" rel="noopener noreferrer" ref={el => linkRefs.current[1] = el}>Live Demo</a>
                </div>
              </div>
            </div>
          </section> */}
          <section id="contact" className="section contact-section" ref={el => sectionRefs.current['contact'] = el}>
            <h2>Contact</h2>
            <form className="contact-form" onSubmit={e => e.preventDefault()}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" required></textarea>
              <button type="submit">Send</button>
            </form>
          </section>
        </main>
      </div>
    );
  }

  export default App;

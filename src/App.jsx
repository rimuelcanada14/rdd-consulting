import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaArrowLeft, FaViber } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

import { FaYoutube, FaTiktok, FaLinkedin, FaFacebook } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";


function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    contactNumber: '',
    preferredContact: '',
    inquiry: '',
    message: '',
    receiveUpdates: false
  })
  const [count, setCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isLoading, setIsLoading] = useState(false) // Add loading state
  const [openDropdowns, setOpenDropdowns] = useState({
    orgStrategy: false,
    hrSystems: false,
    culture: false,
    insights: false,
    leadership: false,
    communication: false,
    criticalThinking: false,
    leadershipMgmt: false,
    performance: false,
    cultureDiversity: false,
    digital: false,
    personal: false
  })
  const marqueeRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  // Add this function to handle form changes
const handleFormChange = (e) => {
  const { name, value, type, checked } = e.target
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }))
}


const handleFormSubmit = async (e) => {
  e.preventDefault();
  
  setIsLoading(true); // Start loading

  try {
    const response = await fetch('/.netlify/functions/sendInquiryEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    setIsLoading(false); // Stop loading before showing alert

    if (response.ok) {
      alert('Thank you for your inquiry! We will get back to you soon.');
      setFormData({
        fullName: '',
        email: '',
        contactNumber: '',
        preferredContact: '',
        inquiry: '',
        message: '',
        receiveUpdates: false,
      });
    } else {
      alert('Failed to send inquiry. Please try again later.');
    }
  } catch (error) {
    setIsLoading(false); // Stop loading before showing alert
    console.error('Error sending inquiry:', error);
    alert('An error occurred. Please try again later.');
  }
};

  
  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleDropdown = (dropdownId) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdownId]: !prev[dropdownId]
    }))
  }

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    // Close mobile menu if open
    setIsMenuOpen(false)
  }

  // Handle navigation clicks
  const handleNavClick = (e, sectionId) => {
    e.preventDefault()
    scrollToSection(sectionId)
  }

  // Replace the useEffect for infinite scroll logic with this:
useEffect(() => {
  const marqueeElement = marqueeRef.current
  if (!marqueeElement) return

  const handleScroll = () => {
    if (isScrolling) return // Don't interfere during manual scrolling
    
    const scrollLeft = marqueeElement.scrollLeft
    const scrollWidth = marqueeElement.scrollWidth
    const clientWidth = marqueeElement.clientWidth
    const maxScroll = scrollWidth - clientWidth
    
    // Only reset when very close to the edges (seamless loop)
    if (scrollLeft >= maxScroll * 0.9) {
      marqueeElement.scrollLeft = maxScroll * 0.1
    } else if (scrollLeft <= maxScroll * 0.1) {
      marqueeElement.scrollLeft = maxScroll * 0.9
    }
  }

  marqueeElement.addEventListener('scroll', handleScroll, { passive: true })
  return () => marqueeElement.removeEventListener('scroll', handleScroll)
}, [isScrolling])

// Replace the scrollLeft and scrollRight functions with these:
const scrollLeft = () => {
  if (isScrolling || !marqueeRef.current) return
  
  setIsScrolling(true)
  setIsPaused(true)
  
  const currentScroll = marqueeRef.current.scrollLeft
  const scrollAmount = 300 // Increased for smoother feel
  
  marqueeRef.current.scrollTo({
    left: Math.max(0, currentScroll - scrollAmount),
    behavior: 'smooth'
  })
  
  if (scrollTimeoutRef.current) {
    clearTimeout(scrollTimeoutRef.current)
  }
  
  scrollTimeoutRef.current = setTimeout(() => {
    setIsPaused(false)
    setIsScrolling(false)
  }, 600) // Reduced timeout for better responsiveness
}

const scrollRight = () => {
  if (isScrolling || !marqueeRef.current) return
  
  setIsScrolling(true)
  setIsPaused(true)
  
  const currentScroll = marqueeRef.current.scrollLeft
  const maxScroll = marqueeRef.current.scrollWidth - marqueeRef.current.clientWidth
  const scrollAmount = 300 // Increased for smoother feel
  
  marqueeRef.current.scrollTo({
    left: Math.min(maxScroll, currentScroll + scrollAmount),
    behavior: 'smooth'
  })
  
  if (scrollTimeoutRef.current) {
    clearTimeout(scrollTimeoutRef.current)
  }
  
  scrollTimeoutRef.current = setTimeout(() => {
    setIsPaused(false)
    setIsScrolling(false)
  }, 600) // Reduced timeout for better responsiveness
}

  const handleMarqueeInteraction = (isHovering) => {
    if (!isScrolling) {
      setIsPaused(isHovering)
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Sample partner logos - replace with actual partner logo URLs
  const partnerLogos = [
    { name: "Innodata", url: "/innodata.png" },
    { name: "Account In Us", url: "/accountinus.png" },
    { name: "CSC", url: "/csc.png" },
    { name: "Yamaha", url: "/yamaha.png" },
    { name: "Vertere", url: "/vertere.png" },
    { name: "ncc", url: "/ncc.png" },
    { name: "jti", url: "/jti.png" },
    { name: "vestas", url: "/vestas.png" },
    { name: "Lati", url: "/lati.png" },
    { name: "RBV", url: "/rbv.jpg" },
    { name: "Eternal", url: "/eternal.png" },
    { name: "CPA", url: "/cpa.jpg" },
    { name: "OLem", url: "/olern.png" },
    { name: "Disco", url: "/disco.png" },
    { name: "ALFI", url: "/alli.png" },
    { name: "Vivant", url: "/vivant.png" },
    { name: "Camel", url: "/camel.jpg" },
    { name: "ITD", url: "/itd.png" },
    { name: "Landers", url: "/landers.png" },
    { name: "GV", url: "/gv.png" },
    { name: "Mind", url: "/mind.png" },
    { name: "PMap", url: "/pmap.png" },
    { name: "Ariva", url: "/ariva.png" },
    { name: "Dept", url: "/dept.png" }
]

  // Create 100 repetitions of the partner logos
  const createLoopedLogos = () => {
    const loops = []
    for (let i = 0; i < 100; i++) {
      loops.push(...partnerLogos)
    }
    return loops
  }

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          backdropFilter: 'blur(5px)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px'
          }}>
            {/* Spinner */}
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #004AAD',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            
            {/* Loading Text */}
            <p style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '500',
              margin: 0
            }}>
              Sending your inquiry...
            </p>
          </div>
        </div>
      )}

      {/* Add CSS for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo-container">
            <img src="/logo-white.png" className="header-logo" alt="Logo" />
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
            <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</a>
            <a href="#services" className="nav-link" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
            <a href="#connect" className="nav-link" onClick={(e) => handleNavClick(e, 'connect')}>Connect</a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
          <a href="#about" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</a>
          <a href="#services" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'services')}>Services</a>
          <a href="#connect" className="mobile-nav-link" onClick={(e) => handleNavClick(e, 'connect')}>Connect</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section id="home" className="hero-section" >
          <div className="hero-container">
            <div className="hero-left">
              <div className="company-title">
                <img src="/logo-white.png" className="company-logo" alt="Riego de Dios Consulting Logo" />
              </div>
              <p className="company-description">
                A management consulting organization which provides strategic guidance and innovative solutions to help organizations grow, adapt, and thrive in an ever-changing world.
              </p>
            </div>
            
            <div className="hero-right">
              <div className="service-item">
                <div className="service-icon">
                  <img src="/strategy.png" alt="Strategic Planning" className='service-img'/>
                </div>
                <p className="service-text">
                  Helping organizations define clear goals, align their mission and vision, and build sustainable structures for long-term success.
                </p>
              </div>
              
              <div className="service-item">
                <div className="service-icon">
                  <img src="/leadership.png" alt="Leadership Planning" className='service-img'/>
                </div>
                <p className="service-text">
                  Equipping leaders and teams with the tools, coaching, and frameworks needed to increase effectiveness, collaboration, and impact.
                </p>
              </div>
              
              <div className="service-item">
                <div className="service-icon">
                  <img src="/change-management.png" alt="Strategic Planning" className='service-img'/>
                </div>
                <p className="service-text">
                  Guiding organizations through transformation with adaptive strategies that foster innovation and resilience in dynamic environments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Partnerships Section */}
        <section className="partnerships-section">
          <div className="partnerships-container">
            <h2 className="partnerships-title">In Partnerships With:</h2>
            <div className="marquee-wrapper">
              <button 
                className="nav-arrow nav-arrow-left" 
                onClick={scrollLeft}
                onTouchStart={scrollLeft}
              >
                <FaArrowLeft />
              </button>
              
              <div 
                className="marquee-container" 
                ref={marqueeRef}
                onMouseEnter={() => handleMarqueeInteraction(true)}
                onMouseLeave={() => handleMarqueeInteraction(false)}
                onTouchStart={() => handleMarqueeInteraction(true)}
                onTouchEnd={() => handleMarqueeInteraction(false)}
              >
                <div className={`marquee-content ${isPaused ? 'paused' : ''}`}>
                  {/* 100 loops of partner logos for seamless infinite scroll */}
                  {createLoopedLogos().map((partner, index) => (
                    <div key={`logo-${index}`} className="partner-logo-wrapper">
                      <img 
                        src={partner.url} 
                        alt={`${partner.name} logo`} 
                        className="partner-logo"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.target.src = `https://via.placeholder.com/120x60/004AAD/FFFFFF?text=${partner.name}`
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="nav-arrow nav-arrow-right" 
                onClick={scrollRight}
                onTouchStart={scrollRight}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-container">
            <h2 className="about-title">About Riego de Dios Consulting</h2>
            
            <div className="about-content">
              {/* Who We Are */}
              <div className="about-item">
                <div className="about-left">
                  <img 
                    src="/about1.jpg" 
                    alt="Team meeting" 
                    className="about-image"
                  />
                </div>
                <div className="about-right">
                  <h2 className="about-subtitle">Who We Are</h2>
                  <p className="about-text">
                    Riego de Dios Consulting specializes in organizational transformation, leadership development, and executive placement. We help businesses enhance performance, develop strong leaders, and navigate change with tailored, data-driven solutions. With a commitment to excellence, we empower organizations to thrive, lead, and stay ahead in a rapidly evolving world.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="about-item reverse">
                <div className="about-left">
                  <h2 className="about-subtitle">Mission</h2>
                  <p className="about-text">
                    Our mission is to uplift communities through accessible best-in-class HR practices and development programs. We aim to achieve this by living our values of integrity, inclusivity, and innovation.
                  </p>
                </div>
                <div className="about-right">
                  <img 
                    src="/about2.jpg" 
                    alt="Team photo" 
                    className="about-image"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="values-item">
                <h2 className="values-title">Values</h2>
                <div className="values-grid">
                  <div className="value-card">
                    <div className="value-icon">
                      <img 
                        src="/agree.png" 
                        alt="Integrity icon" 
                        className="value-icon-img"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80/FFFFFF/004AAD?text=✓"
                        }}
                      />
                    </div>
                    <h3 className="value-name">Integrity</h3>
                    <p className="value-description">
                      We are trustworthy partners who deliver to their commitments and act with ethics and conscientiousness.
                    </p>
                  </div>

                  <div className="value-card">
                    <div className="value-icon">
                      <img 
                        src="/inclusivity.png" 
                        alt="Inclusivity icon" 
                        className="value-icon-img"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80/FFFFFF/004AAD?text=👥"
                        }}
                      />
                    </div>
                    <h3 className="value-name">Inclusivity</h3>
                    <p className="value-description">
                      We believe in creativity and excellence through continuous improvement and staying relevant to evolving needs.
                    </p>
                  </div>

                  <div className="value-card">
                    <div className="value-icon">
                      <img 
                        src="/idea.png" 
                        alt="Innovation icon" 
                        className="value-icon-img"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80/FFFFFF/💡"
                        }}
                      />
                    </div>
                    <h3 className="value-name">Innovation</h3>
                    <p className="value-description">
                      We believe in creativity and excellence; this is a journey and a life-long pursuit to be better and relevant each day.
                    </p>
                  </div>
                </div>
              </div>
              {/* Meet Eric Section */}
            <section className="eric-section">
              <div className="eric-container">
                <div className="eric-content">
                  <div className="eric-image-wrapper">
                    <img 
                      src="/portrait2.png" 
                      alt="Eric Riego De Dios" 
                      className="eric-image"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x500/004AAD/FFFFFF?text=Eric+Riego+De+Dios"
                      }}
                    />
                  </div>
                  
                  <div className="eric-text">
                    <h2 className="eric-title">Meet Eric Riego de Dios</h2>
                    <p className="eric-description">
                      Eric Riego de Dios has more than 25 years of corporate experience in different industries working with market leaders such as DHL, Citi, Globe, and IBM. He has held different leadership roles including global spans covering 48 countries. He is a multi-awarded HR Leader and a global keynote speaker recognized as one of the 100 Global HR Heroes and Top 100 Filipinos on LinkedIn. He is a certified Strategic HR Business Partner, Certified HR Management Executive, Coach and Mentor, MBTI, and FIRO Facilitator, DDI Facilitator, LEGO Serious Play Facilitator, and a PMAP Fellow in People Management. He received Gold Awards for Culture Creation at the Asia Pacific SSON. He has also been named by Economic Times HR as one of the Top 21 HR Influencers in Southeast Asia.
                    </p>
                  </div>
                </div>
              </div>
            </section>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section">
          <div className="services-container">
            <div className="services-header">
              <h2 className="services-title">Services of Riego de Dios Consulting</h2>
            </div>
            
            <div className="services-content">
              <div className="services-column">
                <div className="capability-header">
                  <div className="capability-icon">
                    <img 
                        src="/discussion.png" 
                        alt="Innovation icon" 
                        className="yes-icon"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80/FFFFFF/💡"
                        }}
                      />
                  </div>
                  <h2 className="capability-title">Consulting Capability</h2>
                </div>
                
                <div className="services-list">
                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('orgStrategy')}
                    >
                      <span>Organizational Strategy and Information</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.orgStrategy ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.orgStrategy && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Organizational Transformation</li>
                          <li>Change Management</li>
                          <li>Strategic Planning</li>
                          <li>Capability Gap Analysis and Development</li>
                          <li>Performance System Development</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('hrSystems')}
                    >
                      <span>HR Systems and Talent Strategy</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.hrSystems ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.hrSystems && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Total Rewards Design, Salary Structure, and Job Evaluation</li>
                          <li>Executive Headhunting and Placement</li>
                          <li>HR Process Audit and HR Capability Assessment</li>
                          <li>Strategic Workforce and Planning</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('culture')}
                    >
                      <span>Culture, Engagement and Inclusion</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.culture ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.culture && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Engagement Frameworks, Surveys, and Action Planning</li>
                          <li>Diversity, Equity, Inclusion, and Belonging (DEIB) Programs</li>
                          <li>Building a Culture of Wellness</li>
                          <li>Team Building and Development</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('insights')}
                    >
                      <span>People Insights and Analytics</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.insights ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.insights && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Organizational and Industry Surveys, Research, and FGDs</li>
                          <li>Attrition Analysis</li>
                          <li>People Analytics</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('leadership')}
                    >
                      <span>Leadership and Advisory</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.leadership ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.leadership && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Executive Coaching</li>
                          <li>Keynote Speech Delivery</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="services-column">
                <div className="capability-header">
                  <div className="capability-icon">
                    <img 
                        src="/training.png" 
                        alt="Innovation icon" 
                        className="yes-icon"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80/FFFFFF/💡"
                        }}
                      />
                  </div>
                  <h2 className="capability-title-d">Training Capability</h2>
                </div>
                
                <div className="services-list">
                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('communication')}
                    >
                      <span>Communication and Professional Presence</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.communication ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.communication && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Effective Business Communication</li>
                          <li>Assertive Communication</li>
                          <li>Public Speaking and the Art of Storytelling</li>
                          <li>Business Etiquette to Enhance Personal and Corporate Brand</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('criticalThinking')}
                    >
                      <span>Critical Thinking and Strategic Decision-Making</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.criticalThinking ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.criticalThinking && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Critical Thinking and Strategic Decision-Makin</li>
                          <li>Leading for Success: The Growth Mindset Leader</li>
                          <li>Personal Mission, Vision, and Values Workshop</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('leadershipMgmt')}
                    >
                      <span>Leadership and People Management</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.leadershipMgmt ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.leadershipMgmt && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Leadership Essentials for New People Leaders</li>
                          <li>Strengthening Leadership for Middle Managers</li>
                          <li>Coaching and Mentoring</li>
                          <li>Courageous Conversations</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('performance')}
                    >
                      <span>Performance and Workforce Optimization</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.performance ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.performance && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Performance and KPI Management</li>
                          <li>Essential Skills for Effective Interviewing</li>
                          <li>Strategic Workforce and Planning</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('cultureDiversity')}
                    >
                      <span>Culture, Diversity and Adaptability</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.cultureDiversity ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.cultureDiversity && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Cultural Sensitivity and Adaptability</li>
                          <li>Building Inclusive Teams</li>
                          <li>Navigating Change in Diverse Workplaces</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('digital')}
                    >
                      <span>Digital and Analytical Competence</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.digital ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.digital && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Artificial Intelligence for HR</li>
                          <li>People Analytics</li>
                          <li>Project Management</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="service-dropdown">
                    <button 
                      className="dropdown-header"
                      onClick={() => toggleDropdown('personal')}
                    >
                      <span>Personal Effectiveness and Productivity</span>
                      <svg 
                        className={`dropdown-arrow ${openDropdowns.personal ? 'open' : ''}`}
                        width="20" height="20" viewBox="0 0 24 24" fill="none"
                      >
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {openDropdowns.personal && (
                      <div className="dropdown-content">
                        <ul className="dropdown-list">
                          <li>Productivity and Time Management</li>
                          <li>Stress and Time Management</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="connect" className="contact-section">
          <div className="contact-container">
            <h2 className="contact-title">Let us empower leaders and strengthen organizations!</h2>
            
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group inquiry-group">
                <label htmlFor="inquiry" className="form-label">Inquiry</label>
                <select
                  id="inquiry"
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleFormChange}
                  className="form-input"
                  required
                >
                  <option value="">Select inquiry type</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Training">Training</option>
                  <option value="Management/HR Inquiry">Management/HR Inquiry</option>
                  <option value="Research">Research</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group message-group">
                <label htmlFor="message" className="form-label">Message / Inquiry Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  className="form-textarea"
                />
              </div>
              

              <div className="form-group">
                <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleFormChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferredContact" className="form-label">Preferred Contact Method</label>
                <select
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleFormChange}
                  className="form-input"
                  required
                >
                  <option value="">Select a contact method</option>
                  <option value="Email">Email</option>
                  <option value="SMS">Text/SMS</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Viber">Viber</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="receiveUpdates"
                  name="receiveUpdates"
                  checked={formData.receiveUpdates}
                  onChange={handleFormChange}
                  className="form-checkbox"
                />
                <label htmlFor="receiveUpdates" className="checkbox-label">
                  I would like to receive updates from you.
                </label>
              </div>

              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>

          <section className="footer-section">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-left">
                <div className="footer-logo">
                  <img src="/logo-blue.png" className="footer-logo-img" alt="Riego de Dios Consulting Logo" />
                </div>
              </div>
              
              <div className="footer-right">
                <h3 className="footer-title">Reach us out at:</h3>
                
                <div className="contact-info">
        <div className="contact-row">
            <div className="contact-item">
                <a 
                    href="mailto:eric@riegodedios.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <MdOutlineEmail className="contact-icon"/>
                    <span className="contact-des">eric@riegodedios.com</span>
                </a>
            </div>
            
            <div className="contact-item">
                <a 
                    href="https://www.youtube.com/@RiegodeDiosConsulting" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <FaYoutube className="contact-icon"/>
                    <span className="contact-des">@RiegoDeDiosConsulting</span>
                </a>
            </div>
        </div>
        
        <div className="contact-row">
            <div className="contact-item">
                <a 
                    href="viber://chat?number=%2B639178790029" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <FaViber className="contact-icon"/>
                    <span className="contact-des">+639178790029</span>
                </a>
            </div>
            
            <div className="contact-item">
                <a 
                    href="https://www.tiktok.com/@ericriegodedios" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <FaTiktok className="contact-icon"/>
                    <span className="contact-des">Eric Riego de Dios</span>
                </a>
            </div>
        </div>
        
        <div className="contact-row">
            <div className="contact-item">
                <a 
                    href="https://www.linkedin.com/company/riego-de-dios-consulting/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <FaLinkedin className="contact-icon"/>
                    <span className="contact-des">Riego de Dios Consulting</span>
                </a>
            </div>
            
            <div className="contact-item">
                <a 
                    href="https://www.facebook.com/RiegodeDiosConsulting/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <FaFacebook className="contact-icon"/>
                    <span className="contact-des">Riego de Dios Consulting</span>
                </a>
            </div>
        </div>
    </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p className="copyright">© 2025 Riego de Dios Consulting. All rights reserved</p>
            </div>
          </div>
        </section>

        </section>

      </main>
    </>
  )
}

export default App
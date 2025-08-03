import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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


const handleFormSubmit = (e) => {
  e.preventDefault()
  console.log('Form submitted:', formData)
  // Add your form submission logic here
  alert('Thank you for your inquiry! We will get back to you soon.')
  // Reset form
  setFormData({
    fullName: '',
    email: '',
    contactNumber: '',
    preferredContact: '',
    inquiry: '',
    message: '',
    receiveUpdates: false
  })
}
  
  

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

  // Handle infinite scroll logic
  useEffect(() => {
    const marqueeElement = marqueeRef.current
    if (!marqueeElement) return

    const handleScroll = () => {
      const scrollLeft = marqueeElement.scrollLeft
      const scrollWidth = marqueeElement.scrollWidth
      const clientWidth = marqueeElement.clientWidth
      
      // Reset position when reaching near the end (seamless loop with 100 repetitions)
      // We use a smaller fraction since we have many more repetitions
      if (scrollLeft >= (scrollWidth - clientWidth) * 0.67) {
        marqueeElement.scrollLeft = (scrollWidth - clientWidth) * 0.33
      } else if (scrollLeft <= (scrollWidth - clientWidth) * 0.33) {
        marqueeElement.scrollLeft = (scrollWidth - clientWidth) * 0.67
      }
    }

    marqueeElement.addEventListener('scroll', handleScroll)
    return () => marqueeElement.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollLeft = () => {
    if (isScrolling || !marqueeRef.current) return
    
    setIsScrolling(true)
    setIsPaused(true)
    
    const currentScroll = marqueeRef.current.scrollLeft
    marqueeRef.current.scrollTo({
      left: currentScroll - 200,
      behavior: 'smooth'
    })
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
      setIsScrolling(false)
    }, 800)
  }

  const scrollRight = () => {
    if (isScrolling || !marqueeRef.current) return
    
    setIsScrolling(true)
    setIsPaused(true)
    
    const currentScroll = marqueeRef.current.scrollLeft
    marqueeRef.current.scrollTo({
      left: currentScroll + 200,
      behavior: 'smooth'
    })
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
      setIsScrolling(false)
    }, 800)
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-container">
            <h2 className="about-title">About Riego De Dios Consulting</h2>
            
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
                    <h2 className="eric-title">Meet Eric Riego De Dios</h2>
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
              <h2 className="services-title">Services of Riego De Dios Consulting</h2>
            </div>
            
            <div className="services-content">
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
                          <li>Strategic Planning & Implementation</li>
                          <li>Business Process Optimization</li>
                          <li>Market Analysis & Competitive Intelligence</li>
                          <li>Digital Transformation Strategy</li>
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
                          <li>Talent Acquisition & Retention</li>
                          <li>Performance Management Systems</li>
                          <li>Succession Planning</li>
                          <li>HR Technology Implementation</li>
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
                          <li>Cultural Assessment & Development</li>
                          <li>Employee Engagement Programs</li>
                          <li>Diversity & Inclusion Initiatives</li>
                          <li>Team Building & Collaboration</li>
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
                          <li>HR Analytics & Metrics</li>
                          <li>Employee Survey Design & Analysis</li>
                          <li>Predictive Workforce Modeling</li>
                          <li>Data-Driven Decision Making</li>
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
                          <li>Executive Coaching & Mentoring</li>
                          <li>Leadership Development Programs</li>
                          <li>Strategic Advisory Services</li>
                          <li>Board & C-Suite Consulting</li>
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
                        src="/idea.png" 
                        alt="Innovation icon" 
                        className="yes-icon"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/80x80/FFFFFF/💡"
                        }}
                      />
                  </div>
                  <h2 className="capability-title">Training Capability</h2>
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
                          <li>Public Speaking & Presentation Skills</li>
                          <li>Executive Communication</li>
                          <li>Cross-Cultural Communication</li>
                          <li>Digital Communication Strategies</li>
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
                          <li>Problem-Solving Methodologies</li>
                          <li>Data-Driven Decision Making</li>
                          <li>Risk Assessment & Management</li>
                          <li>Strategic Thinking Workshops</li>
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
                          <li>Leadership Essentials Training</li>
                          <li>Team Management & Motivation</li>
                          <li>Conflict Resolution</li>
                          <li>Emotional Intelligence Development</li>
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
                          <li>Performance Improvement Programs</li>
                          <li>Productivity Enhancement</li>
                          <li>Time Management & Efficiency</li>
                          <li>Goal Setting & Achievement</li>
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
                          <li>Cultural Competency Training</li>
                          <li>Change Management</li>
                          <li>Unconscious Bias Training</li>
                          <li>Adaptability & Resilience</li>
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
                          <li>Digital Literacy Training</li>
                          <li>Data Analysis & Interpretation</li>
                          <li>Technology Adoption</li>
                          <li>Digital Workflow Optimization</li>
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
                          <li>Personal Productivity Systems</li>
                          <li>Work-Life Balance</li>
                          <li>Stress Management</li>
                          <li>Professional Development Planning</li>
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
                <input
                  type="text"
                  id="inquiry"
                  name="inquiry"
                  value={formData.inquiry}
                  onChange={handleFormChange}
                  className="form-input"
                />
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
                  required
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
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferredContact" className="form-label">Preferred Contact Method</label>
                <input
                  type="text"
                  id="preferredContact"
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleFormChange}
                  className="form-input"
                />
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

              <button type="submit" className="submit-button">
                Submit
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
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>eric@riegodedios.com</span>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10C2.38 10 2.38 10 2.38 10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span>@RiegoDeDiosConsulting</span>
                    </div>
                  </div>
                  
                  <div className="contact-row">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M22 16.92V19.92C22 20.52 21.39 21 20.92 21C9.34 21 0 11.66 0 0.08C0 -0.39 0.48 -1 1.08 -1H4.08C4.68 -1 5.08 -0.39 5.08 0.08C5.08 2.25 5.43 4.35 6.05 6.31C6.18 6.75 6.05 7.22 5.74 7.53L4.21 9.06C5.38 11.94 7.94 14.5 10.82 15.67L12.35 14.14C12.66 13.83 13.13 13.7 13.57 13.83C15.53 14.45 17.63 14.8 19.8 14.8C20.27 14.8 20.88 15.32 20.88 15.92V19.92H22Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span>+639178994006</span>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M9 19C10.776 19 12.4 18.672 13.598 17.598C14.672 16.4 15 14.776 15 13V11C15 9.224 14.672 7.6 13.598 6.402C12.4 5.328 10.776 5 9 5C7.224 5 5.6 5.328 4.402 6.402C3.328 7.6 3 9.224 3 11V13C3 14.776 3.328 16.4 4.402 17.598C5.6 18.672 7.224 19 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 15.9999V13.9999C21 12.2239 20.672 10.5999 19.598 9.40192C18.4 8.32792 16.776 7.99992 15 7.99992" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span>Eric Riego De Dios</span>
                    </div>
                  </div>
                  
                  <div className="contact-row">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M16 8C16 10.21 14.21 12 12 12C9.79 12 8 10.21 8 8C8 5.79 9.79 4 12 4C14.21 4 16 5.79 16 8ZM20.94 11C20.48 6.83 17.17 3.52 13 3.06C12.45 3.02 11.89 3 11.33 3C10.11 3 8.9 3.16 7.75 3.46C3.58 4.84 0.62 8.93 0.62 13.65C0.62 18.92 4.92 23.22 10.19 23.22C15.46 23.22 19.76 18.92 19.76 13.65C19.76 12.76 19.9 11.86 20.94 11Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span>riegodedios.com</span>
                    </div>
                    
                    <div className="contact-item">
                      <div className="contact-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M18.77 7.46L18.92 6.14C19.03 5.31 18.47 4.56 17.64 4.46L16.32 4.31C15.49 4.2 14.74 4.76 14.63 5.59L14.48 6.91C14.37 7.74 14.93 8.49 15.76 8.6L17.08 8.75C17.91 8.86 18.66 8.3 18.77 7.46ZM22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12ZM20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <span>Riego De Dios Consulting</span>
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
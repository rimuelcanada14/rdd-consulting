import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const marqueeRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
                          e.target.src = "https://via.placeholder.com/80x80/FFFFFF/004AAD?text=💡"
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
                      src="/portrait.png" 
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

        

        {/* Original Vite Content */}
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </main>
    </>
  )
}

export default App
import './styles.css'
import { Rocket, Earth, Trophy, Handshake } from 'lucide-react'
import React, { useState, useEffect } from 'react'

export default function Overlay() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Detect scroll event and add blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust scroll threshold as needed
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="container">
      <header className={isScrolled ? 'blur' : 'no-blur'}>
        <div className="brand">
          <img src="brand.png" width={30} />
          <p>
            <strong>USDX</strong>
          </p>
        </div>
        {/* <div>
          <ul>
            <li>Learn</li>
            <li>Numbers</li>
            <li>Engage</li>
          </ul>
        </div> */}
        <button>Connect Wallet</button>
      </header>

      <div className="main-wrapper">
        <section className="section section-1">
          <div className="wrapper">
            <h2>
              <strong>USDX</strong>
            </h2>
            <h2>Stability Perfected, Freedom Unleashed</h2>
            <p>
              The first truly decentralized stablecoin, pegged <strong>1:1 to USDT</strong> and{' '}
              <strong>governed by cutting-edge technology.</strong> USDX combines{' '}
              <strong>unmatched price stability</strong> with the{' '}
              <strong>blazing speed and low fees</strong> of the{' '}
              <strong>OP BNB Blockchain, </strong>delivering the ultimate digital asset for the
              decentralized future.
            </p>
          </div>
        </section>

        <section className="section section-2">
          <div className="wrapper">
            <h2>
              Why <strong>USDX?</strong>
            </h2>
            <p>
              In a world of uncertainty and centralized control, USDX redefines stability and
              security. Built on the high-performance <strong>OP BNB Blockchain,</strong> USDX
              offers lightning-fast, cost-efficient transactions while maintaining an unwavering{' '}
              <strong>$1 peg. </strong>With the power of the <strong>Trigger Peg Bot</strong> and
              complete decentralization, <strong>USDX</strong> isn’t just a stablecoin - it’s the
              new standard.
            </p>
            {/* <ul>
              <li>
                DNA-driven cell repair for long-lasting <strong>brain rejuvenation</strong>
              </li>
              <li>
                Enhanced <strong>memory and cognitive</strong> function
              </li>
              <li>
                Increased <strong>mental sharpness</strong> and focus
              </li>
              <li>
                Support for overall <strong>brain health and longevity</strong>
              </li>
            </ul> */}
          </div>
        </section>

        <section className="section section-3 ">
          <div className="wrapper">
            {/* <div className="card-wrapper">
            <div className="card">
              <h2>85%</h2>
              <p>
                Over 85% of participants experienced significant improvements in memory and
                cognitive function within the first 6 weeks
              </p>
            </div>
            <div className="card">
              <h2>85%</h2>
              <p>
                Over 85% of participants experienced significant improvements in memory and
                cognitive function within the first 6 weeks
              </p>
            </div>
          </div> */}
            <div className="numbers-title">
              <h2>
                <strong>Key Highlights</strong>
              </h2>
              <p>The Trigger Peg Bot Technology-Unwavering Stability, Automated.</p>
              <p>
                At the heart of USDX’s success is the Trigger Peg Bot Technology, a revolutionary
                algorithm that guarantees price stability with zero human intervention:
              </p>
              <ul>
                <li>
                  <strong>Advanced Market Intelligence:</strong> Continuously monitors USDX pricing
                  across markets to detect and correct deviations.
                </li>
                <li>
                  <strong>Autonomous Price Recalibration: </strong>Every 6 hours and 30 minutes, the
                  bot triggers strategic adjustments to align USDX perfectly with $1 USDT.
                </li>
                <li>
                  <strong>Hands-Free Operation: </strong>Completely automated and immune to human
                  error, the bot ensures USDX holders enjoy seamless, reliable stability around the
                  clock.
                </li>
              </ul>
              <p>
                With the <strong>Trigger Peg Bot, USDX </strong>sets a new benchmark for
                decentralized price stability, giving users peace of mind and{' '}
                <strong>consistent value </strong>in every transaction.
              </p>
            </div>
          </div>
        </section>
        <section className="section-4">
          <section className="section section-2">
            <div className="wrapper">
              <h2>
                A Decentralized <strong>Liquidity Pool (LP)</strong> Mechanism
              </h2>
              <p>
                <strong>USDX </strong>introduces an advanced <strong>LP </strong>system designed for
                <strong>transparency, security, </strong>and <strong>stability: </strong>
              </p>
              <ul>
                <li>
                  <strong>Automated Liquidity Provisioning:</strong>
                  <div className="card-wrapper">
                    <div className="card">
                      <h2>10%</h2>
                      <p>10% of the staking contract’s fees are allocated to the liquidity pool.</p>
                    </div>
                    <div className="card">
                      <h2>50%</h2>
                      <p>
                        The system splits these funds into <strong>50% USDX </strong>and{' '}
                        <strong>50% USDT,</strong>
                        which are paired to create liquidity on{' '}
                        <strong>decentralized exchanges.</strong>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <ul>
                <li>
                  <strong>LP Token Burn: </strong>The minted LP tokens are sent to the LP Treasury,
                  where they are permanently locked. This means they cannot be withdrawn and are
                  effectively considered burned, creating perpetual liquidity and ensuring price
                  stability.
                </li>
              </ul>
            </div>
          </section>
        </section>
        <section className="section-5">
          <section className="section section-3">
            <div className="wrapper">
              {/* <div className="card-wrapper">
            <div className="card">
              <h2>85%</h2>
              <p>
                Over 85% of participants experienced significant improvements in memory and
                cognitive function within the first 6 weeks
              </p>
            </div>
            <div className="card">
              <h2>85%</h2>
              <p>
                Over 85% of participants experienced significant improvements in memory and
                cognitive function within the first 6 weeks
              </p>
            </div>
          </div> */}
              <div className="numbers-title">
                <h2>
                  Decentralized to the Core –<strong>No Ownership, No Manipulation</strong>
                </h2>
                <p>
                  <strong>USDX</strong> shatters the limits of centralized stablecoins by being 100%
                  decentralized and <strong>community-driven:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Ownership Fully Renounced:</strong> With no centralized authority or
                    owner, USDX cannot be manipulated, paused, or frozen, ensuring true financial
                    freedom for every holder.
                  </li>
                  <li>
                    <strong>Immutable & Transparent:</strong> Built on the OP BNB Blockchain, USDX
                    leverages smart contracts to guarantee complete transparency and verifiability.
                  </li>
                  <li>
                    <strong>Community-Driven Governance: </strong> Decisions are embedded in code,
                    empowering the community to control the asset’s future without interference.
                  </li>
                </ul>
                <p>
                  <strong>This isn’t just another stablecoin – </strong>USDX is a financial
                  revolution, delivering stability and freedom like never before.
                </p>
              </div>
            </div>
          </section>
        </section>
        <section className="section-6">
          <section className="section section-2">
            <div className="wrapper">
              <h2>
                Breaking Free from <strong>Centralized Stablecoins</strong>
              </h2>
              <p>
                Traditional stablecoins like <strong>USDT </strong>and <strong>USDC </strong>come
                with centralized risks:
              </p>
              <ul>
                <li>
                  <strong>Centralized Custody: </strong>Single entities control the reserves,
                  introducing risks of freezing, censorship, or seizure.
                </li>
                <li>
                  <strong>Opaque Operations: </strong>Users must trust organizations to uphold
                  reserves, often with limited transparency or auditing.
                </li>
                <li>
                  <strong>Regulatory Vulnerability: </strong>Centralized assets are prone to
                  restrictions and compliance issues, limiting user freedom.
                </li>
              </ul>
              <p>
                <strong>USDX </strong>eliminates these risks entirely, delivering a fully
                decentralized, trustless solution where control lies solely with the community. It’s
                time to break free and embrace a stablecoin built for freedom.
              </p>
            </div>
          </section>
        </section>
        <section className="section-7">
          <section className="section section-3">
            <div className="wrapper">
              <div className="numbers-title">
                <h2>
                  Powered by <strong>OP BNB </strong>Blockchain –
                  <strong>Fast, Scalable, Cost-Effective</strong>
                </h2>
                <p>
                  <strong>USDX</strong> leverages the superior performance of the{' '}
                  <strong>OP BNB Blockchain </strong>to provide:
                </p>
                <ul>
                  <li>
                    <strong>Ultra-Low Transaction Fees: </strong>Make seamless transfers without
                    worrying about high costs.
                  </li>
                  <li>
                    <strong>Lightning-Fast Transactions: </strong>Experience near-instant transfers
                    and staking operations.
                  </li>
                  <li>
                    <strong>Scalable Infrastructure: </strong>Optimized for high-volume use,
                    ensuring smooth performance even during peak demand.
                  </li>
                </ul>
                <p>
                  The<strong> OP BNB Blockchain </strong>ensures <strong>USDX </strong>delivers
                  unmatched <strong>efficiency and accessibility, </strong>making it the ultimate
                  choice for everyday transactions and large-scale operations alike.
                </p>
              </div>
            </div>
          </section>
        </section>
        <section className="section-8">
          <section className="section section-2">
            <div className="wrapper">
              <h2>
                Your Path to Rewards with <strong>USDX</strong>
              </h2>
              <ul>
                <li>
                  <strong>Seamless Staking</strong>
                </li>
                <p>
                  Unlock the full potential of your assets with <strong>USDX </strong>Staking,
                  designed to provide flexible and rewarding opportunities for everyone.
                </p>
                <p>
                  Earn daily returns ranging from <strong>0.3%</strong> to <strong>1%, </strong>
                  tailored to suit your staking tier. Whether you're a beginner or a seasoned
                  investor, our platform empowers you to maximize your gains with secure,
                  transparent, and efficient staking solutions.
                </p>
                {/* <div className="card-wrapper">
                  <div className="card">
                    <h2>0.3%</h2>
                    <p>
                      <strong>Regular Staking: </strong>Earn 0.3% daily Yield with stable,
                      predictable returns.
                    </p>
                  </div>
                  <div className="card">
                    <h2>0.4%</h2>
                    <p>
                      <strong>Smart X Staking: </strong>Enjoy higher rewards with 0.4% daily Yield,
                      maximizing your earning potential.
                    </p>
                  </div>
                  <div className="card">
                    <h2>0.5%</h2>
                    <p>
                      <strong>Plus X Staking: </strong>Enjoy higher rewards with 0.5% daily Yield,
                      maximizing your earning potential.
                    </p>
                  </div>
                  <div className="card">
                    <h2>0.6%</h2>
                    <p>
                      <strong>Pro X Staking: </strong>Enjoy higher rewards with 0.6% daily Yield,
                      maximizing your earning potential.
                    </p>
                  </div>
                </div>
                <br></br>
                <div className="card-wrapper">
                  <div className="card">
                    <h2>0.7%</h2>
                    <p>
                      <strong>Royal X Staking: </strong>Earn 0.7% daily Yield with stable,
                      predictable returns.
                    </p>
                  </div>
                  <div className="card">
                    <h2>0.8%</h2>
                    <p>
                      <strong>Chief X Staking: </strong>Enjoy higher rewards with 0.8% daily Yield,
                      maximizing your earning potential.
                    </p>
                  </div>
                  <div className="card">
                    <h2>1%</h2>
                    <p>
                      <strong>Empire X Staking: </strong>Enjoy higher rewards with 1% daily Yield,
                      maximizing your earning potential.
                    </p>
                  </div>
                </div> */}
              </ul>
              <ul>
                <li>
                  <strong>Exclusive Yield Packages</strong>
                  <p>
                    New users can access one-time yield packages with exceptional incentives,
                    starting at <strong>$5,000 </strong>and scaling up to{' '}
                    <strong>$1,000,000, </strong>with returns as high as{' '}
                    <strong>$1,300,000 </strong>for the top-tier Empire package.
                  </p>
                  {/* <div className="card-wrapper">
                    <div className="card">
                      <h2>$5,000</h2>
                    </div>
                    <div className="card">
                      <h2>$10,000</h2>
                    </div>
                    <div className="card">
                      <h2>$25,000</h2>
                    </div>
                  </div>
                  <br></br>
                  <div className="card-wrapper">
                    <div className="card">
                      <h2>$50,000</h2>
                    </div>
                    <div className="card">
                      <h2>$100,000</h2>
                    </div>
                    <div className="card">
                      <h2>$500,000</h2>
                    </div>
                  </div> */}
                </li>
              </ul>
              <ul>
                <li>
                  <strong>Referral & Level Income</strong>
                  <div className="card-wrapper">
                    <div className="card">
                      <h2>10%</h2>
                      <p>
                        Earn 10% on direct referrals<br></br> and unlock up to <strong>25 </strong>
                        levels of <br></br>additional rewards, empowering <br></br>you to grow
                        alongside the <br></br>community.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <ul>
                <li>
                  <strong>Advanced Rank System</strong>
                  <p>
                    Climb the ranks to unlock lucrative one-time rewards, monthly incentives, and
                    even a share of global turnover for top achievers.
                  </p>
                </li>
              </ul>
              <h2>
                Why Choose <strong>USDX Staking?</strong>
              </h2>
              <ul>
                <li>
                  <strong>Dynamic ROI: </strong>
                  <p>Enjoy daily rewards that grow with your commitment.</p>
                </li>
                <li>
                  <strong>User-Friendly: </strong>
                  <p>Simple onboarding and seamless management of your stakes.</p>
                </li>
                <li>
                  <strong>Robust Security: </strong>
                  <p>Powered by blockchain technology, ensuring safety and transparency.</p>
                </li>
              </ul>
            </div>
          </section>
        </section>
        <section className="section-9">
          <section className="section section-3">
            <div className="wrapper">
              <div className="numbers-title">
                <h2>
                  Unleashing Marketing Power – <strong>The USDX Roadmap</strong>
                </h2>
                <div className="max-w-2xl mx-auto p-4 space-y-16">
                  <div className="relative">
                    {/* Dashed line connecting the milestones */}
                    <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200 border-dashed border-l-2 border-gray-200" />
                    <div className="relative flex items-start gap-4 pb-12">
                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-4xl font-bold text-gray-300">Q1</h2>
                          {/* Number and Icon */}
                          <div className="relative z-10">
                            <div
                              className={`bg-red-400 rounded-full w-20 h-20 flex items-center justify-center shadow-lg`}>
                              <Rocket className="w-60 h-60 text-white" />
                            </div>
                          </div>
                          <h1 className="text-xl font-semibold">Immediate Launch</h1>
                        </div>

                        {/* List of Description Points */}
                        <ul className="text-gray-600 list-disc pl-5 max-w-md ml-6">
                          <li className="mb-2">
                            <strong>Full Functionality Available Day One: </strong>All smart
                            contract features, including staking, LP provisioning, Trigger Peg Bot,
                            and referral systems, are live from the start.
                          </li>
                          <li className="mb-2">
                            <strong>Global Awareness Campaign: </strong>Launch across major
                            platforms with a focus on DeFi communities, early adopters, and KOLs
                            (Key Opinion Leaders).
                          </li>
                          <li className="mb-2">
                            <strong>Airdrop & Referral Drives: </strong>Distribute USDX to
                            incentivize new users and generate organic word-of-mouth buzz.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-2xl mx-auto p-4 space-y-16">
                  <div className="relative">
                    {/* Dashed line connecting the milestones */}
                    <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200 border-dashed border-l-2 border-gray-200" />
                    <div className="relative flex items-start gap-4 pb-12">
                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-4xl font-bold text-gray-300">Q2</h2>
                          {/* Number and Icon */}
                          <div className="relative z-10">
                            <div
                              className={`bg-red-400 rounded-full w-20 h-20 flex items-center justify-center shadow-lg`}>
                              <Handshake className="w-12 h-12 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold">
                            Strategic Partnerships & Mass Adoption
                          </h3>
                        </div>

                        {/* List of Description Points */}
                        <ul className="text-gray-600 list-disc pl-5 max-w-md ml-6">
                          <li className="mb-2">
                            <strong>Partnerships with Big Brands & Projects: </strong>Collaborate
                            with leading DeFi platforms, wallets, and blockchain ecosystems to
                            integrate USDX.
                          </li>
                          <li className="mb-2">
                            <strong>Engage KOLs and Influencers: </strong>Partner with prominent
                            crypto influencers and industry leaders to amplify visibility.
                          </li>
                          <li className="mb-2">
                            <strong>Major Media Coverage: </strong>Secure feature articles in
                            top-tier media outlets like Forbes, CoinDesk, CryptoSlate, and more to
                            establish USDX as a market leader.
                          </li>
                          <li className="mb-2">
                            <strong>Exchange Listings: </strong>Start negotiations with major
                            decentralized and centralized exchanges for USDX listing.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-2xl mx-auto p-4 space-y-16">
                  <div className="relative">
                    {/* Dashed line connecting the milestones */}
                    <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200 border-dashed border-l-2 border-gray-200" />
                    <div className="relative flex items-start gap-4 pb-12">
                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-4xl font-bold text-gray-300">Q3</h2>
                          {/* Number and Icon */}
                          <div className="relative z-10">
                            <div
                              className={`bg-red-400 rounded-full w-20 h-20 flex items-center justify-center shadow-lg`}>
                              <Earth className="w-12 h-12 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold">Global Expansion & Dominance</h3>
                        </div>

                        {/* List of Description Points */}
                        <ul className="text-gray-600 list-disc pl-5 max-w-md ml-6">
                          <li className="mb-2">
                            <strong>Worldwide Ad Campaigns: </strong>Leverage digital marketing with
                            high-impact campaigns on Google, YouTube, and Twitter.
                          </li>
                          <li className="mb-2">
                            <strong>Local Outreach: </strong>Host in-person and virtual events
                            targeting emerging markets in Asia, Africa, and Latin America.
                          </li>
                          <li className="mb-2">
                            <strong>Ambassador Program: </strong>Recruit and empower community
                            leaders to represent USDX globally, creating localized strategies for
                            adoption.
                          </li>
                          <li className="mb-2">
                            <strong>Big-Brand Sponsorships: </strong>Secure sponsorships with
                            recognized brands in finance, gaming, and e-commerce to position USDX as
                            a mainstream asset.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-2xl mx-auto p-4 space-y-16">
                  <div className="relative">
                    {/* Dashed line connecting the milestones */}
                    <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200 border-dashed border-l-2 border-gray-200" />
                    <div className="relative flex items-start gap-4 pb-12">
                      {/* Content */}
                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-4xl font-bold text-gray-300">Q4</h2>
                          {/* Number and Icon */}
                          <div className="relative z-10">
                            <div
                              className={`bg-red-400 rounded-full w-20 h-20 flex items-center justify-center shadow-lg`}>
                              <Trophy className="w-12 h-12 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold">
                            Recognition & Institutional Integration
                          </h3>
                        </div>

                        {/* List of Description Points */}
                        <ul className="text-gray-600 list-disc pl-5 max-w-md ml-6">
                          <li className="mb-2">
                            <strong>Big Media Push: </strong>Feature USDX in documentaries,
                            podcasts, and case studies showcasing its impact on decentralized
                            finance.
                          </li>
                          <li className="mb-2">
                            <strong>Institutional Partnerships: </strong>Build relationships with
                            venture capital firms, asset managers, and institutional players to
                            integrate USDX into large-scale DeFi operations.
                          </li>
                          <li className="mb-2">
                            <strong>Major Exchange Listings: </strong>Secure listings on top
                            exchanges like Binance, Coinbase, and Bybit to cement USDX’s position as
                            a global stablecoin leader.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>

      <footer>
        <div className="footer-left">
          <h3>USDX</h3>
          <p>Stability Perfected, Freedom Unleashed</p>
          <div className="social">
            <img src="instagram.svg" width={30} />
            <img src="youtube.svg" width={30} />
            <img src="linkedin.svg" width={30} />
          </div>
          <p className="copyright">Copyright @tmc.live All rights reserved.</p>
        </div>
        <div className="footer-right">
          <img src="brand.png" width={80} />

          {/* <ul>
            <li>Privacy policy</li>
            <li>Terms of service</li>
            <li>Cookie policy</li>
            <li>Disclaimer</li>
          </ul> */}
        </div>
      </footer>
    </div>
  )
}

import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface Experience {
  company: string;
  location: string;
  period: string;
  title: string;
  groups: { heading?: string; bullets: string[] }[];
}

interface Education {
  school: string;
  degree: string;
  period: string;
}

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatDividerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  name = 'Nemesio {Bookie} Oandasan';
  location = 'Indian Wells, CA';
  phone = '562-773-9072';
  email = 'bookieoandasan@gmail.com';

  profile = `Strategic Business Systems Development Manager with 25+ years of .NET experience
    designing and scaling homegrown enterprise applications for healthcare. Proven leader who drives
    Agile delivery, aligns technical roadmaps with organizational goals, and manages Informatics
    budgets while maintaining high system reliability (99.9% uptime). Early adopter of on-prem AI
    (LLMs via Ollama) to automate workflows, reduce manual effort, and improve operational efficiency
    across cross-functional teams.`;

  competencies = [
    'Enterprise Portfolio Management',
    'Operational Strategy',
    'Cross-Departmental Alignment',
    'Team Performance Architecture',
    'Talent Strategy',
    'Roadblock Mitigation',
    'SMART Goal Setting',
    'Strategic Budgeting',
    'Performance Coaching',
    'Mentorship',
  ];

  expertise = [
    'Business System Development',
    'AI Technologies',
    'Strategic Planning',
    'Team Leadership',
  ];

  experiences: Experience[] = [
    {
      company: 'Desert Oasis Healthcare',
      location: 'Palm Desert, CA',
      period: 'May 2022 – Present',
      title: 'Business System Developer Manager',
      groups: [
        {
          heading: 'Strategic Leadership & Financial Oversight',
          bullets: [
            'Conduct weekly strategic project reviews with the AVP of Business Informatics and Business Analysts to align software road maps with enterprise objectives.',
            'Spearheading the integration of AI technologies by deploying on-premise LLM models (Ollama) to enhance data privacy and drive organizational efficiency.',
            'Partner with senior leadership to manage yearly Informatics budgets, ensuring optimal resource allocation for business system upgrades.',
          ],
        },
        {
          heading: 'Engineering Governance & DevOps',
          bullets: [
            'Maintain rigorous architectural standards through daily code reviews, ensuring adherence to SOLID principles and OOP.',
            'Orchestrate full-stack Agile ceremonies including Daily Scrums, Bi-weekly Retrospectives, and Sprint Planning.',
            'Oversee Azure DevOps environments, managing CI/CD pipelines to ensure rapid, high-quality software delivery.',
          ],
        },
        {
          heading: 'People & Performance Management',
          bullets: [
            'Cultivate a high-output culture through weekly one-on-ones and comprehensive yearly employee evaluations.',
            'Designed and implemented a structured delegation process to empower lead developers and streamline project ownership.',
            'Manage team SMART goals, Ideal Outcome themes, and essential workflows such as Timecard approvals.',
            'Act as a proactive mentor and motivator, fostering a team environment centered on innovation and continuous learning.',
          ],
        },
      ],
    },
    {
      company: 'Desert Oasis Healthcare',
      location: 'Palm Desert, CA',
      period: 'May 2019 – May 2022',
      title: 'Business System Developer Supervisor',
      groups: [
        {
          bullets: [
            'Actively resolved technical roadblocks identified in daily scrums and collaborated with Business Analysts on bi-weekly sprint planning.',
            'Engineered scalable solutions using Angular (front-end) and C# (back-end), maintaining high code quality through rigorous peer reviews.',
          ],
        },
      ],
    },
    {
      company: 'Desert Oasis Healthcare',
      location: 'Palm Desert, CA',
      period: 'Sept 2015 – May 2019',
      title: 'Senior Business System Developer',
      groups: [
        {
          bullets: [
            'Acted as the main point of contact for stakeholders and users regarding Business Informatics web systems.',
            'Managed system troubleshooting and streamlined operational workflows.',
            'Modernized development processes by implementing Agile, Jira, and Confluence.',
            'Partnered with analysts and directors to manage sprint priorities and project road maps.',
          ],
        },
      ],
    },
    {
      company: "Los Angeles County Sheriff's Department",
      location: 'Norwalk, CA',
      period: 'Dec 2014 – Sept 2015',
      title: 'Senior Dotnet Software Developer',
      groups: [
        {
          bullets: [
            'Spearheaded the successful migration of a mission-critical Oracle Forms application to a modern ASP.NET framework.',
            'Championed the transition from procedural to Object-Oriented Programming (OOP) principles, improving system scalability and code quality.',
            'Established a culture of code reusability by introducing helper classes and user controls, reducing development time.',
          ],
        },
      ],
    },
    {
      company: 'Eyefinity',
      location: 'Irvine, CA',
      period: 'Aug 2014 – Dec 2014',
      title: 'Senior Dotnet Software Developer (Contract)',
      groups: [
        {
          bullets: [
            'Modernized a legacy VB6 login system by rewriting it in WPF, improving security and user experience.',
            'Optimized Agile workflows by implementing a soft code freeze policy before sprint completion.',
            'Resolved critical bugs within a legacy VB6 product suite to maintain system uptime and reliability.',
          ],
        },
      ],
    },
    {
      company: 'CGI',
      location: '',
      period: 'Mar 2012 – Feb 2014',
      title: 'Senior .NET Software Developer',
      groups: [
        {
          bullets: [
            'Spearheaded high-impact software solutions for key city departments including Police, Public Utilities, and City Treasury.',
            'Championed the transition to Agile methodologies; directed sprint planning with Fibonacci-based estimation.',
            'Led the architectural redesign and full-scale rewrite of mission-critical applications for the Police Department.',
          ],
        },
      ],
    },
    {
      company: 'McLane Advanced Technologies',
      location: 'Temple, TX',
      period: 'Mar 2007 – Feb 2012',
      title: 'Software Developer',
      groups: [
        {
          bullets: [
            'Developed diverse software solutions including high-performance Web, Windows Desktop, and WPF applications.',
            'Developed mission-critical software for the U.S. Military, adhering to rigorous security and performance standards.',
          ],
        },
      ],
    },
    {
      company: 'Fair Isaac (myFICO)',
      location: 'Irvine, CA',
      period: 'Feb 2000 – Mar 2007',
      title: 'Software Developer',
      groups: [
        {
          bullets: [
            'Developed a web-based Medical Comp Claim Review application utilizing ASP.NET, streamlining the internal claims review process.',
            'Enhanced and optimized a Visual Basic-based claims review system to improve performance and user experience.',
            'Debugged and resolved critical issues within the Medical Comp Claim Review suite, ensuring 24/7 application stability.',
          ],
        },
      ],
    },
  ];

  education: Education[] = [
    {
      school: 'De La Salle University',
      degree: 'B.S. Applied Mathematics, Major in Operations Research — Manila, Philippines',
      period: 'Jan 1987 – Dec 1990',
    },
    {
      school: 'Cerritos College',
      degree: 'IBM AS/400 Specialist Certification',
      period: 'Jan 2020 – Jan 2022',
    },
  ];

  training = 'Effective Manager and Effective Communicator Conference — Manager Tools (Aug 2022)';
  hobbies = 'Golf';
}

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  badgeColor: string;
  integrations: string[];
}

export const platformCategories: CategoryData[] = [
  {
    id: "threat-intel",
    name: "Threat Intelligence",
    description: "Aggregation, enrichment, and analysis of threat intelligence feeds and indicators.",
    badgeColor: "from-amber-500 to-red-500",
    integrations: [
      "Qualys", "Radiflow", "Recorded Future", "Reftab", "Remediant", 
      "SafeBreach", "SentinelOne", "Silverfort", "Snowflake", "Splunk", 
      "Tanium", "ThreatQuotient", "Trellix", "Vectra", "VirusTotal"
    ]
  },
  {
    id: "cspm",
    name: "CSPM",
    description: "Cloud Security Posture Management across multi-cloud infrastructure and services.",
    badgeColor: "from-blue-500 to-indigo-600",
    integrations: [
      "Wiz", "Orca Security", "Palo Alto Networks Prisma Cloud", "Check Point CloudGuard", 
      "Microsoft Defender for Cloud", "AWS Security Hub", "Google Security Command Center", 
      "Tenable Cloud Security", "Rapid7 InsightCloudSec", "Qualys TotalCloud", 
      "CrowdStrike Falcon Cloud Security", "Lacework FortiCNAPP", "Aqua Security", 
      "Zscaler Posture Control"
    ]
  },
  {
    id: "email-security",
    name: "Email Security",
    description: "Phishing defense, malware filtering, and message security integrations.",
    badgeColor: "from-purple-500 to-pink-600",
    integrations: [
      "Kubernetes", "1Password", "Samurai XDR", "Trend Micro", "Zscaler", 
      "Zix", "Wiz", "Votiro", "VMRay", "Veeam", "Tines", "Tenable", 
      "Sumo Logic", "Symantec", "Slack"
    ]
  },
  {
    id: "cnapp",
    name: "CNAPP",
    description: "Cloud-Native Application Protection Platform for end-to-end cloud security.",
    badgeColor: "from-emerald-500 to-teal-600",
    integrations: [
      "HackerOne", "Honeywell", "IBM", "Joe Sandbox", "JupiterOne", 
      "Kivera", "LogRhythm", "Mandiant", "Micro Focus", "Mimecast", 
      "Netskope", "OCSF", "Oracle", "PagerDuty", "PingOne"
    ]
  },
  {
    id: "it-ops",
    name: "IT Operations",
    description: "IT service management, asset discovery, endpoint monitoring, and core infrastructure.",
    badgeColor: "from-cyan-500 to-blue-600",
    integrations: [
      "AlienVault", "Analyst1", "Aqua Security", "Aruba", "AT&T", 
      "AttackIQ", "Automox", "BlackBerry", "Box", "Cisco", "Cribl", 
      "CrowdStrike", "CyberArk", "CyCognito", "Cylus"
    ]
  },
  {
    id: "soar",
    name: "SOAR",
    description: "Security Orchestration, Automation, and Response workflow platforms.",
    badgeColor: "from-violet-500 to-purple-600",
    integrations: [
      "BeyondTrust", "Auth0", "Atlassian", "At-Bay", "Armis", 
      "Anomali", "Amazon", "Alien Labs OTX", "AbuseIPDB", "42Gears", "AIMS"
    ]
  },
  {
    id: "siem",
    name: "SIEM",
    description: "Security Information and Event Management for log ingestion and telemetry analysis.",
    badgeColor: "from-orange-500 to-amber-600",
    integrations: [
      "BlueCat Networks", "Check Point", "Cloudflare", "Criminal IP", "Cybereason", 
      "Darktrace", "Docker", "Exabeam", "F5 Distributed Cloud Services", "Forescout", 
      "Graylog", "HashiCorp", "HP", "Infoblox", "JumpCloud"
    ]
  },
  {
    id: "cloud-security",
    name: "Cloud Security",
    description: "Identity management, access control, password vaulting, and cloud workload protection.",
    badgeColor: "from-rose-500 to-red-600",
    integrations: [
      "Keeper Security", "Lacework", "Malwarebytes", "Mattermost", "Microsoft", 
      "MISP TIP", "OAuth", "Okta", "Orca Security", "Palo Alto Networks", "Prometheus"
    ]
  }
];

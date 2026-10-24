import React from "react";
import ServicePageTemplate from "../../../components/ServicePageTemplate";
import { seoData } from "../../../data/seoData";

const DELIVERABLES = [
  "Cloud setup on AWS or Google Cloud",
  "Automated build and deployment pipelines",
  "Monitoring and alerts",
  "Backup and recovery planning",
  "Cloud cost review",
];

const FAQS = [
  {
    q: "How long does a cloud infrastructure setup or migration take?",
    a: "Typical cloud setups and migration sprints take between 2 to 6 weeks, depending on existing infrastructure state and environment complexity.",
  },
  {
    q: "Which cloud platforms do you support?",
    a: "We work primarily across Amazon Web Services (AWS) and Google Cloud Platform (GCP), utilizing Infrastructure-as-Code with Terraform.",
  },
  {
    q: "Who owns the cloud accounts and infrastructure code?",
    a: "All infrastructure is provisioned directly inside your organization's cloud account, giving you 100% administrative control and ownership.",
  },
  {
    q: "Can you help optimize existing high cloud bills?",
    a: "Yes, our cloud cost review audit identifies idle resources, over-provisioned compute, and unused storage to streamline monthly spend.",
  },
  {
    q: "How do we get started?",
    a: "We conduct an initial infrastructure audit to review your workloads, security baseline, and deployment goals.",
  },
];

export default function CloudSolutions() {
  return (
    <ServicePageTemplate
      seoProps={seoData["/services/software-engineering/cloud-solutions"]}
      breadcrumbs={[
        { label: "Home", path: "/" },
        { label: "Services", path: "/services" },
        { label: "Cloud & DevOps", path: "/services/software-engineering/cloud-solutions" },
      ]}
      eyebrow="SOFTWARE & CLOUD ENGINEERING / 04"
      serviceName="Cloud & DevOps"
      benefitHeadline="dependable hosting, deployment, and monitoring."
      overviewP1="We set up cloud infrastructure that is easy to deploy to, easy to monitor, and easy to understand, so your team can release updates with confidence."
      typicalTimeline="Typical timeline: 2 – 6 weeks (scope dependent)"
      deliverables={DELIVERABLES}
      techStack={["AWS", "Google Cloud", "Kubernetes", "Docker", "Terraform", "GitHub Actions"]}
      faqs={FAQS}
    />
  );
}
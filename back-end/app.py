from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import sys
sys.path.append('..')
from PeopleSearch import PeopleSearch
from tiering import tiering


app = FastAPI()
ps = PeopleSearch()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins. Change to specific domains in production.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all HTTP headers
)


class InputText(BaseModel):
    text: str
    
DUMMY_RESPONSE = [
  {
    "data": {
      "first_name": "Ying",
      "last_name": "Yang",
      "credit_name": None,
      "orcid_id": "0000-0001-7624-8158",
      "emails": [
        "yy2364@cornell.edu",
        "yangy2@myumanitoba.ca"
      ],
      "keywords": [
        "Cavity Magnonics, Spin defects, Nanomagnetism"
      ],
      "contact_address": []
    },
    "level_two_data": {
      "other_publications": [],
      "education": [
        {
          "education_institution": "University of Manitoba",
          "education_city": "Winnipeg",
          "education_state": "Manitoba",
          "education_country_state_city": "CA",
          "education_department": "Physics",
          "education_degree": "PhD",
          "education_start_date": "09/01/2019",
          "education_end_date": "11/01/2023"
        },
        {
          "education_institution": "University of Manitoba",
          "education_city": "Winnipeg",
          "education_state": "Manitoba",
          "education_country_state_city": "CA",
          "education_department": "Physics",
          "education_degree": "MSc",
          "education_start_date": "09/01/2018",
          "education_end_date": "08/31/2019"
        },
        {
          "education_institution": "East China Normal University",
          "education_city": "Shanghai",
          "education_country_state_city": "CN",
          "education_department": "Microelectronics",
          "education_degree": "BSc",
          "education_start_date": "09/01/2012",
          "education_end_date": "07/01/2016"
        }
      ],
      "career_item": [
        {
          "career_institution": "Cornell University",
          "career_city": "Ithaca",
          "career_country_state": "US",
          "career_role": "Postdoctoral Researcher",
          "career_start_date": "09/02/2024",
          "career_end_date": "N/A"
        },
        {
          "career_institution": "University of Chicago",
          "career_city": "Chicago",
          "career_country_state": "US",
          "career_role": "Postdoctoral Researcher",
          "career_start_date": "11/27/2023",
          "career_end_date": "08/31/2024"
        },
        {
          "career_institution": "Argonne National Laboratory",
          "career_city": "Lemont",
          "career_country_state": "US",
          "career_role": "Research associate",
          "career_start_date": "11/27/2023",
          "career_end_date": "08/31/2024"
        },
        {
          "career_institution": "University of Manitoba",
          "career_city": "MB",
          "career_state": "MB",
          "career_country_state": "CA",
          "career_role": "Student",
          "career_start_date": "09/01/2017",
          "career_end_date": "10/31/2023"
        }
      ],
      "grant_research": [],
      "journal_publications": [
        {
          "journal_publication_title": "Anomalous Long-Distance Coherence in Critically Driven Cavity Magnonics",
          "journal_publication_journal_name": "Physical Review Letters",
          "journal_publication_end_date": "05/14/2024"
        },
        {
          "journal_publication_title": "Synchronization of dissipatively coupled oscillators",
          "journal_publication_journal_name": "Journal of Applied Physics",
          "journal_publication_end_date": "12/14/2023"
        },
        {
          "journal_publication_title": "Theory of Floquet-driven dissipative cavity magnonics",
          "journal_publication_journal_name": "Physical Review B",
          "journal_publication_end_date": "02/15/2023"
        },
        {
          "journal_publication_title": "Bistability in dissipatively coupled cavity magnonics",
          "journal_publication_journal_name": "Physical Review B",
          "journal_publication_end_date": "08/22/2022"
        },
        {
          "journal_publication_title": "Visualization of synchronization zone on the Bloch sphere through an anti-PT-symmetric electrical circuit",
          "journal_publication_journal_name": "AIP Advances",
          "journal_publication_end_date": "03/01/2022"
        },
        {
          "journal_publication_title": "Interferometric control of magnon-induced nearly perfect absorption in cavity magnonics",
          "journal_publication_journal_name": "Nature Communications",
          "journal_publication_end_date": "03/26/2021"
        },
        {
          "journal_publication_title": "Unconventional Singularity in Anti-Parity-Time Symmetric Cavity Magnonics",
          "journal_publication_journal_name": "Physical Review Letters",
          "journal_publication_end_date": "10/01/2020"
        },
        {
          "journal_publication_title": "Interactions between a magnon mode and a cavity photon mode mediated by traveling photons",
          "journal_publication_journal_name": "Physical Review B",
          "journal_publication_end_date": "02/05/2020"
        },
        {
          "journal_publication_title": "Spin number dependent dissipative coupling strength",
          "journal_publication_journal_name": "AIP Advances",
          "journal_publication_end_date": "11/01/2019"
        },
        {
          "journal_publication_title": "Nonreciprocity and Unidirectional Invisibility in Cavity Magnonics",
          "journal_publication_journal_name": "Physical Review Letters",
          "journal_publication_end_date": "09/18/2019"
        },
        {
          "journal_publication_title": "Level Attraction Due to Dissipative Magnon-Photon Coupling",
          "journal_publication_journal_name": "Physical Review Letters",
          "journal_publication_end_date": "09/25/2018"
        },
        {
          "journal_publication_title": "Influence of stripline coupling on the magnetostatic mode line width of an yttrium-iron-garnet sphere",
          "journal_publication_journal_name": "AIP Advances",
          "journal_publication_end_date": "07/01/2018"
        }
      ],
      "book_publications": [],
      "reviewer_role": [
        {
          "reviewer_role": "reviewer",
          "reviewer_end_date": "01/01/2024",
          "reviewer_organization": "Nature Publishing Group"
        },
        {
          "reviewer_role": "reviewer",
          "reviewer_end_date": "01/01/2024",
          "reviewer_organization": "AIP Publishing"
        }
      ]
    }
  },
  {
    "data": {
      "first_name": "Sabarinathan",
      "last_name": "Ramachandran",
      "credit_name": None,
      "orcid_id": "0000-0003-2239-8083",
      "emails": [],
      "keywords": [],
      "contact_address": []
    },
    "level_two_data": {
      "other_publications": [
        {
          "publication_title": "Establishment of Skeletal Myogenic Progenitors from Non-Human Primate Induced Pluripotent Stem Cells.",
          "publication_end_date": "2023",
          "publication_identifier": "37190056"
        },
        {
          "publication_title": "A bioengineered artificial interstitium supports long-term islet xenograft survival in nonhuman primates without immunosuppression.",
          "publication_end_date": "2024",
          "publication_identifier": "38181083"
        },
        {
          "publication_title": "Long-term tolerance of islet allografts in nonhuman primates induced by apoptotic donor leukocytes.",
          "publication_end_date": "2018",
          "publication_identifier": "31375697"
        },
        {
          "publication_title": "Clinically available immunosuppression averts rejection but not systemic inflammation after porcine islet xenotransplant in cynomolgus macaques.",
          "publication_end_date": "2021",
          "publication_identifier": "34704345"
        }
      ],
      "education": [
        {
          "education_institution": "Anna University Chennai",
          "education_city": "Chennai",
          "education_state": "Tamil Nadu",
          "education_country_state_city": "IN",
          "education_department": "Biotechnology",
          "education_degree": "Ph.D.",
          "education_start_date": "01/02/1996",
          "education_end_date": "02/25/2001"
        },
        {
          "education_institution": "Anna University Chennai",
          "education_city": "Chennai",
          "education_state": "Tamil Nadu",
          "education_country_state_city": "IN",
          "education_department": "Biotechnology",
          "education_degree": "M. Tech",
          "education_start_date": "07/01/1993",
          "education_end_date": "12/28/1994"
        },
        {
          "education_institution": "University of Madras",
          "education_city": "Chennai",
          "education_state": "Tamil Nadu",
          "education_country_state_city": "IN",
          "education_department": "Biochemistry",
          "education_degree": "M. S.",
          "education_start_date": "07/01/1991",
          "education_end_date": "06/20/1993"
        },
        {
          "education_institution": "University of Madras",
          "education_city": "Chennai",
          "education_state": "Tamil Nadu",
          "education_country_state_city": "IN",
          "education_department": "Microbiology",
          "education_degree": "B. S.",
          "education_start_date": "10/10/1988",
          "education_end_date": "05/30/1991"
        }
      ],
      "career_item": [
        {
          "career_institution": "University of Minnesota",
          "career_city": "Minneapolis",
          "career_state": "Minnesota",
          "career_country_state": "US",
          "career_role": "Associate Professor",
          "career_start_date": "07/01/2021",
          "career_end_date": "N/A"
        },
        {
          "career_institution": "University of Minnesota",
          "career_city": "MN",
          "career_state": "MN",
          "career_country_state": "US",
          "career_role": "Assistant Professor",
          "career_start_date": "06/22/2016",
          "career_end_date": "06/30/2021"
        },
        {
          "career_institution": "University of Chicago",
          "career_city": "Chicago",
          "career_state": "IL",
          "career_country_state": "US",
          "career_role": "Director, Research Professional",
          "career_start_date": "02/01/2014",
          "career_end_date": "02/01/2016"
        },
        {
          "career_institution": "Washington University in St. Louis School of Medicine",
          "career_city": "St Louis",
          "career_state": "Missouri",
          "career_country_state": "US",
          "career_role": "Research Instructor",
          "career_start_date": "03/01/2001",
          "career_end_date": "01/31/2014"
        }
      ],
      "grant_research": [
        {
          "grant_title": "Alloantibodies to MHC induces autoimmunity and obliterative airway disease (OAD)",
          "grant_agency": "National Institutes of Health",
          "grant_start_date": "08/01/2009",
          "grant_end_date": "05/01/2013"
        },
        {
          "grant_title": "Characterization of novel mechanisms for inhibition of islet cell apoptosis",
          "grant_agency": "Juvenile Diabetes Research Foundation",
          "grant_start_date": "02/01/2005",
          "grant_end_date": "01/31/2007"
        },
        {
          "grant_title": "Pig-to-Monkey Islet Xenotransplantation",
          "grant_agency": "National Institute of Allergy and Infectious Diseases",
          "grant_start_date": "07/01/2015",
          "grant_end_date": "06/30/2020"
        },
        {
          "grant_title": "Deep Immune Profiling of Nonchimeric Tolerance of Transplants in Nonhuman Primates",
          "grant_agency": "National Institute of Allergy and Infectious Diseases",
          "grant_start_date": "04/22/2022",
          "grant_end_date": "03/31/2024"
        },
        {
          "grant_title": "Preclinical studies of pluripotent stem cell-derived myogenic progenitors in non-human primates",
          "grant_agency": "National Institute of Arthritis and Musculoskeletal and Skin Diseases",
          "grant_start_date": "08/06/2021",
          "grant_end_date": "06/30/2026"
        },
        {
          "grant_title": "Evaluation of islet xenograft survival and function using a novel bioengineered serum ultrafiltrate perfusion device in nonhuman primates",
          "grant_agency": "Juvenile Diabetes Research Foundation",
          "grant_start_date": "06/01/2015",
          "grant_end_date": "12/31/2019"
        },
        {
          "grant_title": "An Ultra filtrate perfusion bio artificial pancreas for high-density islet replacement without immunosuppression",
          "grant_agency": "National Institute of Diabetes and Digestive and Kidney Diseases",
          "grant_start_date": "06/03/2016",
          "grant_end_date": "08/31/2021"
        },
        {
          "grant_title": "REVEAL - Research Evaluating Vagal Excitation and Anatomical Linkages.",
          "grant_agency": "National Center for Complementary and Integrative Health",
          "grant_start_date": "09/23/2022",
          "grant_end_date": "08/31/2025"
        },
        {
          "grant_title": "Generating Exogenic Organs for Transplantation without the Use of Immunosuppression",
          "grant_agency": "National Institute of Allergy and Infectious Diseases",
          "grant_start_date": "09/21/2022",
          "grant_end_date": "07/31/2027"
        }
      ],
      "journal_publications": [
        {
          "journal_publication_title": "Establishment of Skeletal Myogenic Progenitors from Non-Human Primate Induced Pluripotent Stem Cells",
          "journal_publication_journal_name": "Cells",
          "journal_publication_end_date": "04/01/2023"
        },
        {
          "journal_publication_title": "Clinically available immunosuppression averts rejection but not systemic inflammation after porcine islet xenotransplant in cynomolgus macaques",
          "journal_publication_journal_name": "American Journal of Transplantation",
          "journal_publication_end_date": "03/01/2022"
        },
        {
          "journal_publication_title": "Boosting of SARS-CoV-2 immunity in nonhuman primates using an oral rhabdoviral vaccine.",
          "journal_publication_journal_name": "Vaccine",
          "journal_publication_end_date": "01/10/2022"
        },
        {
          "journal_publication_title": "A nonhuman primate model of vertical sleeve gastrectomy facilitates mechanistic and translational research in human obesity",
          "journal_publication_journal_name": "iScience",
          "journal_publication_end_date": "12/01/2021"
        },
        {
          "journal_publication_title": "Serum cytokine profiles in healthy nonhuman primates are blunted by sedation and demonstrate sexual dimorphism as detected by a validated multiplex immunoassay.",
          "journal_publication_journal_name": "Scientific reports",
          "journal_publication_end_date": "01/27/2021"
        },
        {
          "journal_publication_title": "Noninvasive Fluorine-19 Magnetic Resonance Relaxometry Measurement of the Partial Pressure of Oxygen in Acellular Perfluorochemical-loaded Alginate Microcapsules Implanted in the Peritoneal Cavity of Nonhuman Primates.",
          "journal_publication_journal_name": "Transplantation",
          "journal_publication_end_date": "02/01/2020"
        },
        {
          "journal_publication_title": "Long-term tolerance of islet allografts in nonhuman primates induced by apoptotic donor leukocytes",
          "journal_publication_journal_name": "Nature Communications",
          "journal_publication_end_date": "08/02/2019"
        },
        {
          "journal_publication_title": "Endogenous Reprogramming of Alpha Cells into Beta Cells, Induced by Viral Gene Therapy, Reverses Autoimmune Diabetes",
          "journal_publication_journal_name": "Cell Stem Cell",
          "journal_publication_end_date": "01/01/2018"
        },
        {
          "journal_publication_title": "Total Pancreatectomy with Islet Autotransplantation for the Ampullary Cancer. A Case Report",
          "journal_publication_journal_name": "Journal of Gastrointestinal Cancer",
          "journal_publication_end_date": "01/01/2017"
        },
        {
          "journal_publication_title": "B Cell-Activating Transcription Factor Plays a Critical Role in the Pathogenesis of Anti-Major Histocompatibility Complex-Induced Obliterative Airway Disease",
          "journal_publication_journal_name": "American Journal of Transplantation",
          "journal_publication_end_date": "01/01/2016"
        },
        {
          "journal_publication_title": "MicroRNA-144 is unlikely to play a role in bronchiolitis obliterans syndrome: To the Editor",
          "journal_publication_journal_name": "Journal of Heart and Lung Transplantation",
          "journal_publication_end_date": "01/01/2016"
        },
        {
          "journal_publication_title": "Transient suppression of TGF\u03b2 receptor signaling facilitates human islet transplantation",
          "journal_publication_journal_name": "Endocrinology",
          "journal_publication_end_date": "01/01/2016"
        },
        {
          "journal_publication_title": "Dysregulated MicroRNA expression and chronic lung allograft rejection in recipients with antibodies to donor HLA",
          "journal_publication_journal_name": "American Journal of Transplantation",
          "journal_publication_end_date": "01/01/2015"
        },
        {
          "journal_publication_title": "MicroRNA-144 dysregulates the transforming growth factor-\u03b2 signaling cascade and contributes to the development of bronchiolitis obliterans syndrome after human lung transplantation",
          "journal_publication_journal_name": "Journal of Heart and Lung Transplantation",
          "journal_publication_end_date": "01/01/2015"
        },
        {
          "journal_publication_title": "Preservation of beta cell function after pancreatic islet autotransplantation: University of Chicago experience",
          "journal_publication_journal_name": "American Surgeon",
          "journal_publication_end_date": "01/01/2015"
        },
        {
          "journal_publication_title": "Efficacy of extracorporeal photopheresis in clearance of antibodies to donor-specific and lung-specific antigens in lung transplant recipients",
          "journal_publication_journal_name": "Journal of Heart and Lung Transplantation",
          "journal_publication_end_date": "01/01/2014"
        },
        {
          "journal_publication_title": "Immune response to tissue-restricted self-antigens induces airway inflammation and fibrosis following murine lung transplantation",
          "journal_publication_journal_name": "American Journal of Transplantation",
          "journal_publication_end_date": "01/01/2014"
        },
        {
          "journal_publication_title": "Protective role of bortezomib in steatotic liver ischemia/reperfusion injury through abrogation of MMP activation and YKL-40 expression",
          "journal_publication_journal_name": "Transplant Immunology",
          "journal_publication_end_date": "01/01/2014"
        },
        {
          "journal_publication_title": "Critical role for IL-17A/F in the Immunopathogenesis of Obliterative airway disease induced by anti-mhc i antibodies",
          "journal_publication_journal_name": "Transplantation",
          "journal_publication_end_date": "01/01/2013"
        },
        {
          "journal_publication_title": "Hepatitis C Virus Induced miR200c Down Modulates FAP-1, a Negative Regulator of Src Signaling and Promotes Hepatic Fibrosis",
          "journal_publication_journal_name": "PLoS ONE",
          "journal_publication_end_date": "01/01/2013"
        },
        {
          "journal_publication_title": "ABO-incompatible organ transplantation",
          "journal_publication_journal_name": "International Journal of Immunogenetics",
          "journal_publication_end_date": "01/01/2012"
        },
        {
          "journal_publication_title": "An obligatory role for lung infiltrating B cells in the immunopathogenesis of obliterative airway disease induced by antibodies to MHC class I molecules",
          "journal_publication_journal_name": "American Journal of Transplantation",
          "journal_publication_end_date": "01/01/2012"
        },
        {
          "journal_publication_title": "Immune responses to self-antigens (autoimmunity) in allograft rejection.",
          "journal_publication_journal_name": "Clinical transplants",
          "journal_publication_end_date": "01/01/2012"
        },
        {
          "journal_publication_title": "Ischemia-reperfusion injury in rat steatotic liver is dependent on NF\u03baB P65 activation",
          "journal_publication_journal_name": "Transplant Immunology",
          "journal_publication_end_date": "01/01/2012"
        },
        {
          "journal_publication_title": "Mechanism of accommodation in a sensitized human leukocyte antigen transgenic murine cardiac transplant model",
          "journal_publication_journal_name": "Transplantation",
          "journal_publication_end_date": "01/01/2012"
        },
        {
          "journal_publication_title": "Modulation of immune responses following solid organ transplantation by microRNA",
          "journal_publication_journal_name": "Experimental and Molecular Pathology",
          "journal_publication_end_date": "01/01/2012"
        },
        {
          "journal_publication_title": "T regulatory cells play a significant role in modulating MHC class i antibody-induced obliterative airway disease",
          "journal_publication_journal_name": "American Journal of Transplantation",
          "journal_publication_end_date": "01/01/2012"
        },
        {
          "journal_publication_title": "The role of molecular chaperonins in warm ischemia and reperfusion injury in the steatotic liver: A proteomic study",
          "journal_publication_journal_name": "BMC Biochemistry",
          "journal_publication_end_date": "01/01/2012"
        },
        {
          "journal_publication_title": "Alloimmunity-induced autoimmunity as a potential mechanism in the pathogenesis of chronic rejection of human lung allografts",
          "journal_publication_journal_name": "Journal of Heart and Lung Transplantation",
          "journal_publication_end_date": "01/01/2011"
        },
        {
          "journal_publication_title": "Characterization of HCV-specific CD4+Th17 immunity in recurrent hepatitis C-induced liver allograft fibrosis",
          "journal_publication_journal_name": "American Journal of Transplantation",
          "journal_publication_end_date": "01/01/2011"
        },
        {
          "journal_publication_title": "Donor graft steatosis influences immunity to hepatitis C virus and allograft outcome after liver transplantation",
          "journal_publication_journal_name": "Transplantation",
          "journal_publication_end_date": "01/01/2011"
        },
        {
          "journal_publication_title": "Endoplasmic reticulum stress is a mediator of posttransplant injury in severely steatotic liver allografts",
          "journal_publication_journal_name": "Liver Transplantation",
          "journal_publication_end_date": "01/01/2011"
        },
        {
          "journal_publication_title": "Cooperative signaling for angiogenesis and neovascularization by VEGF and HGF following islet transplantation",
          "journal_publication_journal_name": "Transplantation",
          "journal_publication_end_date": "01/01/2010"
        },
        {
          "journal_publication_title": "Development of antibodies to human leukocyte antigen precedes development of antibodies to major histocompatibility class I-related chain A and are significantly associated with development of chronic rejection after human lung transplantation",
          "journal_publication_journal_name": "Human Immunology",
          "journal_publication_end_date": "01/01/2010"
        },
        {
          "journal_publication_title": "Synergistic effect of antibodies to human leukocyte antigens and defensins in pathogenesis of bronchiolitis obliterans syndrome after human lung transplantation",
          "journal_publication_journal_name": "Journal of Heart and Lung Transplantation",
          "journal_publication_end_date": "01/01/2010"
        },
        {
          "journal_publication_title": "Antibodies to MHC class I induce autoimmunity: Role in the pathogenesis of chronic rejection",
          "journal_publication_journal_name": "Journal of Immunology",
          "journal_publication_end_date": "01/01/2009"
        },
        {
          "journal_publication_title": "Living donor renal transplantation in the presence of donor-specific human leukocyte antigen antibody detected by solid-phase assay",
          "journal_publication_journal_name": "Human Immunology",
          "journal_publication_end_date": "01/01/2009"
        },
        {
          "journal_publication_title": "Oleanolic acid, a plant triterpenoid, significantly improves survival and function of islet allograft",
          "journal_publication_journal_name": "Transplantation",
          "journal_publication_end_date": "01/01/2009"
        },
        {
          "journal_publication_title": "Activated effector and memory T cells contribute to circulating sCD30: Potential marker for islet allograft rejection",
          "journal_publication_journal_name": "American Journal of Transplantation",
          "journal_publication_end_date": "01/01/2008"
        },
        {
          "journal_publication_title": "De novo production of K-\u03b11 tubulin-specific antibodies: Role in chronic lung allograft rejection",
          "journal_publication_journal_name": "Journal of Immunology",
          "journal_publication_end_date": "01/01/2008"
        },
        {
          "journal_publication_title": "Soluble CD30 levels as a diagnostic marker for bronchiolitis obliterans syndrome following human lung transplantation",
          "journal_publication_journal_name": "Transplant Immunology",
          "journal_publication_end_date": "01/01/2008"
        },
        {
          "journal_publication_title": "Interleukin-1\u03b2 is the primary initiator of pulmonary inflammation following liver injury in mice",
          "journal_publication_journal_name": "American Journal of Physiology - Lung Cellular and Molecular Physiology",
          "journal_publication_end_date": "01/01/2007"
        },
        {
          "journal_publication_title": "A significant role for histocompatibility in human islet transplantation",
          "journal_publication_journal_name": "Transplantation",
          "journal_publication_end_date": "01/01/2006"
        },
        {
          "journal_publication_title": "Complement depletion enhances pulmonary inflammatory response after liver injury",
          "journal_publication_journal_name": "Journal of Gastrointestinal Surgery",
          "journal_publication_end_date": "01/01/2006"
        },
        {
          "journal_publication_title": "Improved islet yields from pancreas preserved in perflurocarbon is via inhibition of apoptosis mediated by mitochondrial pathway",
          "journal_publication_journal_name": "American Journal of Transplantation",
          "journal_publication_end_date": "01/01/2006"
        },
        {
          "journal_publication_title": "Different roles for matrix metalloproteinase-2 and matrix metalloproteinase-9 in the pathogenesis of cardiac allograft rejection",
          "journal_publication_journal_name": "American Journal of Transplantation",
          "journal_publication_end_date": "01/01/2005"
        },
        {
          "journal_publication_title": "Interleukin-1\u03b2 is prominent in the early pulmonary inflammatory response after hepatic injury",
          "journal_publication_journal_name": "Surgery",
          "journal_publication_end_date": "01/01/2005"
        },
        {
          "journal_publication_title": "Novel in vivo murine model to study islet potency: Engraftment and function",
          "journal_publication_journal_name": "Transplantation",
          "journal_publication_end_date": "01/01/2005"
        },
        {
          "journal_publication_title": "Tenascin-C, over expressed in lung cancer down regulates effector functions of tumor infiltrating lymphocytes",
          "journal_publication_journal_name": "Lung Cancer",
          "journal_publication_end_date": "01/01/2005"
        },
        {
          "journal_publication_title": "Human immune responses to porcine endogenous retrovirus-derived peptides presented naturally in the context of porcine and human major histocompatibility complex class I molecules: Implications in xenotransplantation of porcine organs",
          "journal_publication_journal_name": "Transplantation",
          "journal_publication_end_date": "01/01/2004"
        },
        {
          "journal_publication_title": "Natural Antibodies Prevent In Vivo Transmission of Porcine Islet-Derived Endogenous Retrovirus to Human Cells",
          "journal_publication_journal_name": "Cell Transplantation",
          "journal_publication_end_date": "01/01/2004"
        },
        {
          "journal_publication_title": "The introduction of new vaccines into developing countries III. The role of intellectual property",
          "journal_publication_journal_name": "Vaccine",
          "journal_publication_end_date": "01/01/2004"
        },
        {
          "journal_publication_title": "The larval specific lymphatic filarial ALT-2: Induction of protection using protein or DNA vaccination",
          "journal_publication_journal_name": "Microbiology and Immunology",
          "journal_publication_end_date": "01/01/2004"
        },
        {
          "journal_publication_title": "Xenoreactive anti-Gal\u03b1(1,3)Gal antibodies prevent porcine endogenous retrovirus infection of human in vivo",
          "journal_publication_journal_name": "Human Immunology",
          "journal_publication_end_date": "01/01/2003"
        }
      ],
      "book_publications": [],
      "reviewer_role": [
        {
          "reviewer_role": "reviewer",
          "reviewer_end_date": "01/01/2024",
          "reviewer_organization": "Elsevier Editorial "
        },
        {
          "reviewer_role": "reviewer",
          "reviewer_end_date": "01/01/2024",
          "reviewer_organization": "AAAS - Science"
        },
        {
          "reviewer_role": "reviewer",
          "reviewer_end_date": "01/01/2021",
          "reviewer_organization": "PLOS"
        }
      ]
    }
  }
]


@app.post("/process_input")
async def process_input(input: InputText):
    results = ps.search_with_prompt(input.text)  # Perform the search
    # for user in results:
    #     user["tiering"] = tiering(user)
    return {"query": input.text, "results": DUMMY_RESPONSE}
    # return {"query": input.text, "results": results}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

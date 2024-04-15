import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:3000"
})

export default API;


export const availableTimes = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00"
  ];

  export const diseases=[
   
        "Amebiasis",
        "Anaplasmosis and Ehrlichiosis",
        "Babesiosis",
        "Cholera",
        "Botulism, Other",
        "Botulism, Foodborne",
        "Botulism, Wound",
        "Brucellosis",
        "Campylobacteriosis",
        "Chlamydia",
        "Ciguatera Fish Poisoning",
        "Dengue",
        "Coccidioidomycosis",
        "Creutzfeldt-Jakob Disease and other Transmissible Spongiform Encephalopathies",
        "Cryptosporidiosis",
        "Cyclosporiasis",
        "Cysticercosis or Taeniasis",
        "E. coli O157",
        "Diphtheria",
        "HIV",
        "Early Syphilis",
        "Gonorrhea",
        "E. coli Other STEC (non-O157)",
        "Giardiasis",
        "Hantavirus Infection",
        "Hepatitis B, Acute",
        "Hepatitis E, acute infection",
        "Hemolytic Uremic Syndrome",
        "Hepatitis A",
        "Scombroid Fish Poisoning",
        "Hepatitis C, Acute",
        "Invasive Meningococcal Disease",
        "Leprosy",
        "Measles",
        "Leptospirosis",
        "Influenza Death (<65 years of age)",
        "Legionellosis",
        "Malaria",
        "Lyme Disease",
        "Listeriosis",
        "Pertussis",
        "Paralytic Shellfish Poisoning",
        "Psittacosis",
        "Rabies, human",
        "Mumps",
        "Q Fever",
        "Relapsing Fever",
        "Plague, human",
        "Rubella",
        "Salmonellosis",
        "Tetanus",
        "Shiga Toxin Positive Feces (without culture confirmation)",
        "Shigellosis",
        "Spotted Fever Rickettsiosis",
        "Staphylococcus aureus Infection (cases resulting in death or ICU)",
        "Streptococcal Infection (cases in food and dairy workers)",
        "Tuberculosis",
        "Toxic Shock Syndrome (Non-Streptococcal)",
        "Vibrio Infection (non-Cholera)",
        "Trichinosis",
        "Tularemia",
        "Typhoid Fever, case",
        "Varicella Hospitalizations",
        "Typhus Fever",
        "Yersiniosis"

    
  ]

  export const counties =[
    "California",
    "Alameda",
    "Alpine",
    "Amador",
    "Butte",
    "Calaveras",
    "Colusa",
    "Contra Costa",
    "Del Norte",
    "El Dorado",
    "Fresno",
    "Glenn",
    "Humboldt",
    "Imperial",
    "Inyo",
    "Kern",
    "Kings",
    "Lake",
    "Lassen",
    "Los Angeles",
    "Madera",
    "Modoc",
    "Marin",
    "Mariposa",
    "Mendocino",
    "Merced",
    "Mono",
    "Monterey",
    "Napa",
    "Nevada",
    "Orange",
    "Placer",
    "Plumas",
    "Riverside",
    "Sacramento",
    "San Benito",
    "San Bernardino",
    "San Diego",
    "San Francisco",
    "San Joaquin",
    "San Luis Obispo",
    "San Mateo",
    "Santa Barbara",
    "Santa Clara",
    "Santa Cruz",
    "Shasta",
    "Sierra",
    "Siskiyou",
    "Solano",
    "Sonoma",
    "Stanislaus",
    "Sutter",
    "Tehama",
    "Trinity",
    "Tulare",
    "Tuolumne",
    "Ventura",
    "Yolo",
    "Yuba"

  ]




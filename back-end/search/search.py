import os
import json
import time
from pprint import pprint
from abc import ABC, abstractmethod
from elasticsearch import Elasticsearch
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

class Search(ABC):
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.es = Elasticsearch(
            os.getenv("ELASTICSEARCH_URL"),
            api_key=os.getenv("ELASTICSEARCH_API_KEY")
        )
        client_info = self.es.info()
        print('Connected to Elasticsearch!')
        pprint(client_info.body)

    @abstractmethod
    def create_index(self):
        """Abstract method to create index. To be implemented by subclasses."""
        pass

    # @abstractmethod
    # def insert_document(self, document):
    #     """Abstract method to insert a single document. To be implemented by subclasses."""
    #     pass

    # @abstractmethod
    # def insert_documents(self, documents):
    #     """Abstract method to insert multiple documents. To be implemented by subclasses."""
    #     pass

    @abstractmethod
    def retrieve_document(self, id):
        """Abstract method to retrieve a document by ID. To be implemented by subclasses."""
        pass

    def get_openai_embedding(self, text):
        """Helper method to get embeddings using OpenAI."""

        if type(text) == list:
            text = " ".join(text[0])

        response = self.client.embeddings.create(
            input=text,
            model="text-embedding-3-large"
        )
        return response.data[0].embedding
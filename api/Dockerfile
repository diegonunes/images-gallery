FROM python

WORKDIR /app

EXPOSE 5000

COPY requirements.txt ./

RUN pip install -r requirements.txt

COPY . ./

CMD ["python", "main.py"]
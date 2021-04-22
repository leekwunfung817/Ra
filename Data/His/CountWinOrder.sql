What is 名次=WV?

SELECT avg(o) o,hn,count(*) c from 
(
	SELECT 
		CAST(名次 AS INTEGER) o,
		馬名 hn
	FROM LocalResults 
)
where o>0
group by hn
order by o asc;

SELECT avg(o) o,n,count(*) c from 
(
	SELECT 
		CAST(名次 AS INTEGER) o,
		騎師 n
	FROM LocalResults 
)
where o>0
group by n
order by o asc;

SELECT avg(o) o,n,count(*) c from 
(
	SELECT 
		CAST(名次 AS INTEGER) o,
		練馬師 n
	FROM LocalResults 
)
where o>0
group by n
order by o asc;


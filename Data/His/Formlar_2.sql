
with 
raw as (
		SELECT 
			dt,名次 oo,
			CAST(
				REPLACE(名次,' ','') 
			AS INTEGER) o,
			馬名 h,騎師 r,練馬師 t
		from LocalResults 
		order by dt desc 
		limit 1000
)
,raw2 as (
	SELECT * FROM raw 
	where o!=0
)
,Rand as (
	select * from raw2 where dt=(
		select dt from (
			SELECT dt from raw2 
			order by dt desc 
			limit 1000
		)
		order by RANDOM() limit 1
	)
)
,h as (
	select h,avg(o) avo,count(*) c from raw2
	group by h
	order by avo asc
)
,r as (
	select r,avg(o) avo,count(*) c from raw2
	group by r
	order by avo asc
)
,t as (
	select t,avg(o) avo,count(*) c from raw2
	group by t
	order by avo asc
)
,mp as (
	select 
	(
		select avg(m) havm from (
			select h.h,avg(avo-o) m from h,raw2
			where h.h=raw2.h
			group by h.h
			order by m desc
		)
	) havm,
	(
		select avg(m) from (
			select r.r,avg(avo-o) m from r,raw2
			where r.r=raw2.r
			group by r.r
			order by m desc
		)
	) ravm,
	(
		select avg(m) havm from (
			select t.t,avg(avo-o) m from t,raw2
			where t.t=raw2.t
			group by t.t
			order by m desc
		)
	) tavm
)
select Rand.*,(h.avo/havm)*(r.avo/ravm)*(t.avo/tavm) m from Rand,h,r,t,mp
where Rand.h=h.h and Rand.r=r.r and Rand.t=t.t
order by m 
;
Rank as less as possible
effectiveness of calculate is accuracy???

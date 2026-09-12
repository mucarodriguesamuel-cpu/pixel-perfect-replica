UPDATE public.services
SET
  name = 'Blindagem',
  description = 'Proteção e fortalecimento da unha natural, mantendo uma aparência delicada e natural.'
WHERE name = 'Esmaltação em gel';

UPDATE public.services
SET description = 'Alongamentos personalizados com foco em naturalidade, elegância e resistência.'
WHERE name = 'Alongamento de unhas';

UPDATE public.services
SET description = 'Estrutura e proteção sobre a unha natural, sem necessidade de alongamento.'
WHERE name = 'Banho de gel';

UPDATE public.services
SET description = 'Cuidado periódico para preservar estrutura e acabamento, recomendado em média a cada 25 a 30 dias.'
WHERE name = 'Manutenção';

UPDATE public.business_hours
SET
  is_open = true,
  start_time = '09:00',
  end_time = '23:00'
WHERE weekday BETWEEN 0 AND 6;
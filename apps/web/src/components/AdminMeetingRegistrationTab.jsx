import React, { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = {
	full_name: '',
	display_name: '',
	email: '',
	phone: '',
	birth_date: '',
	category: '',
	city: '',
	instagram: '',
	bio: '',
	avatar_url: '',
	terms_accepted: false,
};

export default function AdminMeetingRegistrationTab({ approveRegistration, onAfterCreate }) {
	const [isSaving, setIsSaving] = useState(false);
	const [autoApprove, setAutoApprove] = useState(false);
	const [formData, setFormData] = useState(EMPTY_FORM);
	const fullNameInputRef = useRef(null);

	const normalized = useMemo(() => {
		const normalizedEmail = formData.email.trim().toLowerCase();
		const normalizedPhone = formData.phone.replace(/[^\d+]/g, '').trim();
		const displayName =
			formData.display_name.trim() || formData.full_name.trim().split(' ')[0] || '';

		return {
			normalizedEmail,
			normalizedPhone,
			displayName,
		};
	}, [formData.display_name, formData.email, formData.full_name, formData.phone]);

	const resetForm = () => {
		setFormData(EMPTY_FORM);
		requestAnimationFrame(() => fullNameInputRef.current?.focus());
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCategoryChange = (value) => {
		setFormData((prev) => ({ ...prev, category: value }));
	};

	const validate = async () => {
		if (!formData.terms_accepted) {
			toast.error('Voce deve aceitar os termos e condicoes.');
			return false;
		}

		if (!formData.category) {
			toast.error('Por favor, selecione uma categoria.');
			return false;
		}

		if (!formData.birth_date) {
			toast.error('Informe a data de nascimento.');
			return false;
		}

		if (!EMAIL_REGEX.test(normalized.normalizedEmail)) {
			toast.error('Informe um e-mail valido.');
			return false;
		}

		// Valida algo parecido com o cadastro público para evitar falhas previsíveis.
		if (normalized.normalizedPhone.replace(/\D/g, '').length < 10) {
			toast.error('Informe um telefone valido com DDD.');
			return false;
		}

		// UX: validações rápidas no front (o PB também valida/impede no backend).
		const existingEmail = await pb.collection('pilot_registrations').getList(1, 1, {
			filter: `email="${normalized.normalizedEmail}"`,
			$autoCancel: false,
		});

		if (existingEmail.totalItems > 0) {
			toast.error('Este e-mail ja esta cadastrado.');
			return false;
		}

		const categoryCount = await pb.collection('pilot_registrations').getList(1, 1, {
			filter: `category="${formData.category}"`,
			$autoCancel: false,
		});

		if (categoryCount.totalItems >= 50) {
			toast.error(`A categoria ${formData.category} ja atingiu o limite de 50 pilotos.`);
			return false;
		}

		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isSaving) return;

		setIsSaving(true);
		try {
			const ok = await validate();
			if (!ok) return;

			const created = await pb.collection('pilot_registrations').create(
				{
					full_name: formData.full_name.trim(),
					display_name: normalized.displayName,
					email: normalized.normalizedEmail,
					phone: normalized.normalizedPhone,
					birth_date: formData.birth_date,
					category: formData.category,
					city: formData.city.trim(),
					instagram: formData.instagram.trim(),
					bio: formData.bio.trim(),
					avatar_url: formData.avatar_url.trim(),
					terms_accepted: formData.terms_accepted,
					status: 'pending',
				},
				{ $autoCancel: false }
			);

			toast.success('Cadastro registrado na reuniao com sucesso.');

			resetForm();

			if (autoApprove) {
				if (typeof approveRegistration === 'function') {
					await approveRegistration(created);
				}
				return;
			}

			if (typeof onAfterCreate === 'function') {
				await onAfterCreate();
			}
		} catch (err) {
			console.error('Meeting registration error:', err);
			toast.error('Erro ao registrar cadastro na reuniao.');
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Reuniao (Cadastro Manual)</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="flex flex-col gap-2">
					<p className="text-sm text-muted-foreground">
						Cadastre os pilotos manualmente durante a reuniao. Ao salvar, o cadastro fica como <Badge variant="outline">pending</Badge> e aparece em <b>Cadastros</b>.
					</p>
					<p className="text-xs text-muted-foreground">
						Limite por categoria: 50. Duplicidade por e-mail nao serah permitida.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<Label htmlFor="full_name">Nome Completo *</Label>
							<Input
								ref={fullNameInputRef}
								id="full_name"
								name="full_name"
								value={formData.full_name}
								onChange={handleChange}
								required
								placeholder="Seu nome completo"
							/>
						</div>
						<div>
							<Label htmlFor="display_name">Nome de Exibicao</Label>
							<Input
								id="display_name"
								name="display_name"
								value={formData.display_name}
								onChange={handleChange}
								placeholder="Como voce quer ser chamado"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<Label htmlFor="email">E-mail *</Label>
							<Input
								id="email"
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								required
								placeholder="piloto@exemplo.com"
							/>
						</div>
						<div>
							<Label htmlFor="phone">Telefone / WhatsApp *</Label>
							<Input
								id="phone"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								required
								placeholder="(11) 99999-9999"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div>
							<Label htmlFor="birth_date">Data de Nascimento *</Label>
							<Input
								id="birth_date"
								name="birth_date"
								type="date"
								value={formData.birth_date}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="md:col-span-2">
							<Label htmlFor="category">Categoria *</Label>
							<Select value={formData.category} onValueChange={handleCategoryChange} required>
								<SelectTrigger className="bg-background border-border focus-visible:ring-primary text-white">
									<SelectValue placeholder="Selecione a categoria" />
								</SelectTrigger>
								<SelectContent className="bg-card border-border text-white">
									<SelectItem value="PRO">PRO</SelectItem>
									<SelectItem value="LIGHT">LIGHT</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div>
							<Label htmlFor="city">Cidade</Label>
							<Input
								id="city"
								name="city"
								value={formData.city}
								onChange={handleChange}
								placeholder="Sua cidade"
							/>
						</div>
						<div>
							<Label htmlFor="instagram">Instagram</Label>
							<Input
								id="instagram"
								name="instagram"
								value={formData.instagram}
								onChange={handleChange}
								placeholder="@seu_instagram"
							/>
						</div>
						<div>
							<Label htmlFor="avatar_url">URL da Foto (opcional)</Label>
							<Input
								id="avatar_url"
								name="avatar_url"
								type="url"
								value={formData.avatar_url}
								onChange={handleChange}
								placeholder="https://exemplo.com/sua-foto.jpg"
							/>
						</div>
					</div>

					<div>
						<Label htmlFor="bio">Biografia</Label>
						<Textarea
							id="bio"
							name="bio"
							value={formData.bio}
							onChange={handleChange}
							rows={4}
							placeholder="Conte um pouco sobre voce e sua trajetoria no kart"
						/>
					</div>

					<div className="flex items-start gap-3">
						<Checkbox
							id="terms"
							checked={formData.terms_accepted}
							onCheckedChange={(checked) =>
								setFormData((prev) => ({ ...prev, terms_accepted: checked === true }))
							}
						/>
						<Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
							Aceito os termos e condicoes e autorizo o uso das minhas informacoes e imagens na plataforma COPA LSKR.
						</Label>
					</div>

					<div className="flex items-start gap-3">
						<Checkbox
							id="autoApprove"
							checked={autoApprove}
							onCheckedChange={(checked) => setAutoApprove(checked === true)}
						/>
						<Label htmlFor="autoApprove" className="text-sm leading-relaxed cursor-pointer">
							Aprovar automaticamente apos cadastrar (vai gerar o kart do piloto na hora).
						</Label>
					</div>

					<div className="flex gap-3 flex-col sm:flex-row">
						<Button type="submit" disabled={isSaving} className="flex-1" size="lg">
							{isSaving ? 'Registrando...' : 'Salvar na reuniao'}
						</Button>
						<Button
							type="button"
							variant="outline"
							disabled={isSaving}
							className="sm:w-48"
							onClick={() => resetForm()}
						>
							Limpar
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}


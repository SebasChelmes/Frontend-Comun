export interface GuideStep {
  id: string;
  number: number;
  title: string;
  description: string;
  actor: string;
  durationLabel: string;
  painPoints?: { severity: 'Alta' | 'Media' | 'Baja'; text: string }[];
  hasAttachment?: boolean;
}

export interface Guide {
  processId: string;
  title: string;
  steps: GuideStep[];
}

const altaEmpleado: Guide = {
  processId: 'alta-empleado',
  title: 'Alta de nuevo empleado',
  steps: [
    {
      id: 's1', number: 1,
      title: 'Recibir solicitud de alta',
      description: 'El área de RRHH recibe la solicitud de incorporación del nuevo empleado por correo electrónico o sistema interno. Verificar que la solicitud esté firmada por el responsable de área.',
      actor: 'RRHH', durationLabel: '10–15 min',
    },
    {
      id: 's2', number: 2,
      title: 'Validar documentación',
      description: 'Revisar que el candidato haya entregado toda la documentación requerida: DNI, CUIL, constancia AFIP, datos bancarios y certificado de estudios. Completar el checklist de ingreso.',
      actor: 'RRHH', durationLabel: '20–30 min',
      painPoints: [{ severity: 'Media', text: 'El candidato suele olvidar los datos bancarios, generando una vuelta extra' }],
    },
    {
      id: 's3', number: 3,
      title: 'Cargar datos en sistema',
      description: 'Ingresar los datos del empleado en el sistema de gestión de personal. Asignar legajo, número de empleado y grupo de trabajo. Verificar duplicados antes de confirmar.',
      actor: 'RRHH', durationLabel: '15–20 min',
    },
    {
      id: 's4', number: 4,
      title: 'Crear credenciales de acceso',
      description: 'Crear el usuario en el sistema de identidad corporativo (AD/LDAP). Generar contraseña temporal y configurar el correo electrónico institucional. Asignar grupos y permisos según rol.',
      actor: 'IT', durationLabel: '10–20 min',
    },
    {
      id: 's5', number: 5,
      title: 'Preparar puesto de trabajo',
      description: 'Coordinar con infraestructura la asignación de computadora, teléfono y mobiliario. Verificar que el puesto esté disponible y equipado el día de ingreso.',
      actor: 'IT / Infraestructura', durationLabel: '30–60 min',
      painPoints: [{ severity: 'Alta', text: 'El equipo no siempre está listo el primer día, causando retrasos en la productividad del empleado' }],
    },
    {
      id: 's6', number: 6,
      title: 'Enviar correo de bienvenida',
      description: 'Enviar correo de bienvenida con credenciales temporales, instructivo de primer día y contactos clave. Incluir enlace al manual del empleado y al calendario de onboarding.',
      actor: 'RRHH', durationLabel: '5–10 min', hasAttachment: true,
    },
    {
      id: 's7', number: 7,
      title: 'Reunión de inducción',
      description: 'Presentar al empleado con su equipo y jefe directo. Recorrer las instalaciones. Explicar políticas internas, beneficios y canales de comunicación. Duración aproximada: 2 horas.',
      actor: 'RRHH + Jefe directo', durationLabel: '2 h',
    },
    {
      id: 's8', number: 8,
      title: 'Capacitación inicial en sistema',
      description: 'El área de IT realiza una capacitación básica sobre los sistemas que usará el empleado en su rol. Se entrega guía de referencia rápida.',
      actor: 'IT', durationLabel: '1–2 h', hasAttachment: true,
    },
    {
      id: 's9', number: 9,
      title: 'Firmar documentación legal',
      description: 'El empleado firma el contrato de trabajo, el acuerdo de confidencialidad y las políticas de uso aceptable de sistemas. RRHH guarda originales y entrega copia al empleado.',
      actor: 'RRHH + Empleado', durationLabel: '20–30 min',
    },
    {
      id: 's10', number: 10,
      title: 'Configurar nómina',
      description: 'Registrar al empleado en el sistema de liquidación de sueldos. Confirmar datos bancarios, categoría y modalidad de pago. Programar primera liquidación.',
      actor: 'Liquidaciones', durationLabel: '15–20 min',
    },
    {
      id: 's11', number: 11,
      title: 'Período de seguimiento (30 días)',
      description: 'Realizar check-in semanal durante el primer mes. Resolver dudas, ajustar accesos y verificar integración del empleado al equipo. Completar formulario de seguimiento.',
      actor: 'RRHH + Jefe directo', durationLabel: '30 min / semana',
    },
    {
      id: 's12', number: 12,
      title: 'Cierre de proceso de ingreso',
      description: 'Completar el legajo digital con toda la documentación firmada. Marcar el proceso como finalizado en el sistema. Enviar encuesta de experiencia de onboarding al nuevo empleado.',
      actor: 'RRHH', durationLabel: '10–15 min',
    },
  ],
};

const cierreCaja: Guide = {
  processId: 'cierre-caja',
  title: 'Cierre de caja diario',
  steps: [
    {
      id: 's1', number: 1,
      title: 'Contar efectivo en caja',
      description: 'Al cierre del día, el cajero cuenta el efectivo disponible separando billetes por denominación. Registrar el total en la planilla de cierre.',
      actor: 'Cajero', durationLabel: '10–15 min',
    },
    {
      id: 's2', number: 2,
      title: 'Exportar resumen del sistema POS',
      description: 'Acceder al sistema POS y generar el reporte de ventas del día. Incluir ventas en efectivo, tarjeta débito, tarjeta crédito y transferencias. Exportar en PDF.',
      actor: 'Cajero', durationLabel: '5 min',
    },
    {
      id: 's3', number: 3,
      title: 'Conciliar efectivo vs. sistema',
      description: 'Comparar el efectivo contado con el total de ventas en efectivo registrado en el sistema POS. La diferencia admisible es ≤ $500. Si supera ese valor, revisar tickets del día.',
      actor: 'Supervisor', durationLabel: '15–20 min',
      painPoints: [{ severity: 'Alta', text: 'Las diferencias de caja frecuentes no se investigan y se ajustan manualmente' }],
    },
    {
      id: 's4', number: 4,
      title: 'Preparar depósito bancario',
      description: 'Separar el efectivo a depositar (dejando el fondo de cambio fijo). Completar la boleta de depósito bancario y preparar el sobre para transporte de caudales.',
      actor: 'Supervisor', durationLabel: '10 min',
    },
    {
      id: 's5', number: 5,
      title: 'Registrar cierre en sistema contable',
      description: 'Ingresar el total del cierre en el sistema contable. Adjuntar el PDF del reporte POS y registrar el número de boleta de depósito.',
      actor: 'Contabilidad', durationLabel: '10–15 min',
    },
    {
      id: 's6', number: 6,
      title: 'Enviar reporte al área de finanzas',
      description: 'Enviar por email el resumen diario con: total vendido, efectivo depositado, ventas con tarjeta y diferencia de caja. CC al gerente de sucursal.',
      actor: 'Supervisor', durationLabel: '5 min', hasAttachment: true,
    },
    {
      id: 's7', number: 7,
      title: 'Archivar documentación',
      description: 'Guardar físicamente la copia de la boleta de depósito, el reporte POS impreso y la planilla de cierre firmada. Archivar por fecha en carpeta mensual.',
      actor: 'Supervisor', durationLabel: '5 min',
    },
    {
      id: 's8', number: 8,
      title: 'Confirmar cierre',
      description: 'Cerrar sesión en el sistema POS. Asegurar la caja registradora. Notificar al sistema que el cierre del día fue completado exitosamente.',
      actor: 'Cajero', durationLabel: '2–3 min',
    },
  ],
};

const cargaPedidos: Guide = {
  processId: 'carga-pedidos-erp',
  title: 'Carga de pedidos en ERP',
  steps: [
    { id: 's1', number: 1, title: 'Recibir pedido del cliente', description: 'El equipo comercial recibe el pedido por email, WhatsApp o sistema de e-commerce. Descargar el detalle del pedido y verificar que esté completo (producto, cantidad, precio, dirección de entrega).', actor: 'Comercial', durationLabel: '5–10 min' },
    { id: 's2', number: 2, title: 'Verificar stock', description: 'Consultar el ERP para confirmar disponibilidad de los artículos del pedido. Si hay faltantes, notificar al cliente y ofrecer alternativas o fecha estimada.', actor: 'Depósito', durationLabel: '10–15 min', painPoints: [{ severity: 'Alta', text: 'El stock en ERP no siempre coincide con el stock físico real' }] },
    { id: 's3', number: 3, title: 'Crear orden de venta en ERP', description: 'Ingresar al módulo de ventas del ERP. Crear nueva orden asociando el cliente, los productos, cantidades y precios acordados. Aplicar descuentos si corresponde.', actor: 'Comercial', durationLabel: '15–20 min' },
    { id: 's4', number: 4, title: 'Aprobación de crédito', description: 'Si el pedido supera el límite de crédito del cliente, enviar para aprobación al área de créditos. El proceso puede tardar hasta 24 hs.', actor: 'Créditos', durationLabel: '30 min – 24 h', painPoints: [{ severity: 'Media', text: 'La aprobación de crédito demora la entrega sin comunicación al cliente' }] },
    { id: 's5', number: 5, title: 'Generar remito y lista de preparación', description: 'Desde la orden aprobada, generar el remito de entrega y la lista de preparación para el depósito. Imprimir ambos documentos.', actor: 'Logística', durationLabel: '5 min', hasAttachment: true },
    { id: 's6', number: 6, title: 'Preparar pedido en depósito', description: 'El equipo de depósito arma el pedido según la lista de preparación. Verificar cantidades, lotes y fechas de vencimiento si aplica. Embalar y rotular.', actor: 'Depósito', durationLabel: '20–60 min' },
    { id: 's7', number: 7, title: 'Asignar transportista', description: 'Coordinar con logística el transportista o el turno de entrega. Actualizar la fecha estimada de entrega en el ERP y notificar al cliente.', actor: 'Logística', durationLabel: '10 min' },
    { id: 's8', number: 8, title: 'Despachar pedido', description: 'Entregar el pedido al transportista con el remito firmado. Registrar la salida del stock en el ERP y actualizar el estado del pedido a "Despachado".', actor: 'Depósito', durationLabel: '10–15 min' },
    { id: 's9', number: 9, title: 'Confirmar entrega', description: 'Una vez entregado, el transportista confirma la entrega (foto o firma digital). Actualizar el estado en ERP a "Entregado". Si hubo rechazo, registrar motivo.', actor: 'Logística', durationLabel: '5 min' },
    { id: 's10', number: 10, title: 'Emitir factura', description: 'Desde la orden entregada, emitir la factura electrónica en el ERP (conectado a AFIP). Enviar la factura al cliente por email.', actor: 'Administración', durationLabel: '5–10 min', hasAttachment: true },
    { id: 's11', number: 11, title: 'Registrar cobro', description: 'Cuando el cliente realiza el pago, registrar el cobro en el ERP asociando el número de factura. Actualizar el saldo de cuenta corriente.', actor: 'Administración', durationLabel: '5–10 min' },
    { id: 's12', number: 12, title: 'Cerrar orden de venta', description: 'Verificar que la orden tenga todos los estados completados (entregado + cobrado). Cerrar la orden en el ERP y archivar documentación relacionada.', actor: 'Comercial', durationLabel: '5 min' },
    { id: 's13', number: 13, title: 'Actualizar CRM', description: 'Registrar el pedido en el CRM con resultado (entregado a tiempo / con demoras / rechazado). Añadir notas de satisfacción si el cliente dio feedback.', actor: 'Comercial', durationLabel: '5–10 min' },
    { id: 's14', number: 14, title: 'Análisis post-pedido', description: 'Mensualmente, revisar métricas de pedidos: tiempo promedio, porcentaje de entregas a tiempo, motivos de rechazo y diferencias de stock. Presentar reporte a gerencia.', actor: 'Comercial + Logística', durationLabel: '30–60 min / mes' },
    { id: 's15', number: 15, title: 'Encuesta de satisfacción', description: 'Enviar encuesta de satisfacción al cliente 2 días después de la entrega. Registrar respuestas en el CRM.', actor: 'Comercial', durationLabel: '2–5 min', hasAttachment: true },
    { id: 's16', number: 16, title: 'Seguimiento de cuenta corriente', description: 'Verificar facturas vencidas e impagás. Enviar recordatorio de pago según política de cobranza.', actor: 'Administración', durationLabel: '10–15 min' },
    { id: 's17', number: 17, title: 'Cierre contable del período', description: 'Al fin de mes, verificar que todas las órdenes del período estén correctamente cerradas y reflejadas en el balance. Conciliar con contaduría.', actor: 'Administración', durationLabel: '1–2 h / mes' },
    { id: 's18', number: 18, title: 'Fin del proceso', description: 'El proceso de carga y seguimiento del pedido queda completamente registrado y archivado. La orden puede consultarse como histórico en el ERP.', actor: 'Sistema', durationLabel: '—' },
  ],
};

export const GUIDES: Guide[] = [altaEmpleado, cierreCaja, cargaPedidos];

export function getGuide(processId: string): Guide | undefined {
  return GUIDES.find((g) => g.processId === processId);
}
